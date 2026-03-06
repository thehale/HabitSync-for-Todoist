import { NativeModules } from "react-native";
import { Storage } from "../lib/Storage";
import { queryTasks } from "../lib/Todoist"
import { normalize } from "../lib/normalize";
import { MINUTES } from "../lib/time";

const { LoopHabitModule } = NativeModules;

/*
  Todoist sometimes has a delay between a task's completion
  and that completion's visibility in the API.
  
  If we always save the last sync time as "now", we might miss tasks that were
  just completed but don't yet appear in the API.

  So, we grab all tasks completed since a little before the last sync time.
  To avoid double counting, a task will only trigger a habit update if it was
  completed after the last sync time that we have saved.
 */
const API_LAG_BUFFER = 30 * MINUTES;

module.exports = async () => {
  const timestamp = new Date().toISOString();
  try {
    const apiToken = Storage.ApiKey.read();
    const storedTasks = Storage.Tasks.read()
    
    const queryDate = new Date(Storage.LastSync.read().getTime() - API_LAG_BUFFER);
    const recentlyCompletedTasks = await queryTasks(apiToken, queryDate);
    const recentlyCompleted = new Map(recentlyCompletedTasks.map(t => [t.id, t]));
    const habitCompletingTasks = storedTasks
      .filter(stored => stored.habit !== undefined)
      .filter(stored => recentlyCompleted.has(stored.id))
      .filter(stored => recentlyCompleted.get(stored.id)!.completedAt > stored.completedAt)

    // Habit actions are fired in parallel (matching the original behavior) to
    // minimise sync duration. allSettled ensures a single failure doesn't
    // prevent the remaining habits from being updated or the log from recording.
    // @ts-ignore
    const results = await Promise.allSettled(habitCompletingTasks.map(t => LoopHabitModule.takeHabitAction(t.habit.id, t.habit.action)));

    const habitUpdates: Array<{ taskTitle: string; habitName: string }> = [];
    const habitErrors: Array<{ taskTitle: string; habitName: string; error: string }> = [];
    results.forEach((result, i) => {
      const t = habitCompletingTasks[i];
      if (result.status === 'fulfilled') {
        habitUpdates.push({ taskTitle: t.title, habitName: t.habit!.name });
      } else {
        habitErrors.push({ taskTitle: t.title, habitName: t.habit!.name, error: String(result.reason) });
      }
    });

    Storage.SyncLogs.append({
      timestamp,
      success: true,
      recentlyCompletedTasks: recentlyCompletedTasks.map(t => ({ id: t.id, title: t.title })),
      habitUpdates,
      ...(habitErrors.length > 0 && { habitErrors }),
    });

    console.debug(JSON.stringify({
      message: 'Sync completed',
      recentlyCompletedTasks,
      recentlyCompletedTasksCount: recentlyCompletedTasks.length,
      habitCompletingTasks,
      habitCompletingTasksCount: habitCompletingTasks.length,
    }));
    
    Storage.Tasks.write(normalize([...storedTasks, ...recentlyCompletedTasks]));
    Storage.LastSync.write(new Date())
  } catch (e: any) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    Storage.SyncLogs.append({
      timestamp,
      success: false,
      recentlyCompletedTasks: [],
      habitUpdates: [],
      error: errorMessage,
    });
    console.error(JSON.stringify({ message: 'Sync failed', error: errorMessage }));
    throw e;
  }
}
