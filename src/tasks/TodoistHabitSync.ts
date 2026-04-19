import { NativeModules } from "react-native";
import { Storage } from "../lib/Storage";
import { queryTasks } from "../lib/Todoist"
import { MINUTES } from "../lib/time";
import { LOG, StructuredLog } from "../lib/lenador";
import { Task } from "../types";

const { LoopHabitModule } = NativeModules;
const { NotificationModule } = NativeModules;

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

const NEW_HABIT_CHANNEL_ID = "new_habit_channel";
const NEW_HABIT_CHANNEL_NAME = "New Habits";
const NEW_HABIT_NOTIFICATION_ID = 2;

module.exports = async () => {
  await LOG.transaction(`sync-${new Date().toISOString()}`, sync);
}

async function sync() {
  const apiToken = getAPIKey();
  const lastSync = Storage.LastSync.read();
  const queryDate = new Date(lastSync.getTime() - API_LAG_BUFFER);

  LOG.record({ lastSync: lastSync.toISOString(), queryDate: queryDate.toISOString() });

  const storedTasks = Storage.Tasks.read()
  const storedMap = new Map(storedTasks.map(t => [t.id, t]));
  if (__DEV__) {
    LOG.record({ storedTasks: redactTasks(storedTasks) });
  }
  
  const recentlyCompletedTasks = await queryTasks(apiToken, queryDate);
  LOG.record({ recentlyCompletedTasks: redactTasks(recentlyCompletedTasks) });
  recentlyCompletedTasks
    .filter(task => ensure(storedMap.has(task.id), "skip: not stored", { "task.id": task.id }))
    .map(task => [task, storedMap.get(task.id)!])
    .filter(([task, stored]) => ensure(stored.habit !== undefined, "skip: not linked", { "task.id": task.id }))
    .filter(([task, stored]) => ensureCompletedSinceLastSync(task, stored))
    .forEach(async ([task, stored]) => await recordHabitUpdate(task, stored.habit!.id, stored.habit!.action));

  const newUnlinkedTasks = recentlyCompletedTasks.filter(
    task => !storedMap.has(task.id)
  );
  if (newUnlinkedTasks.length > 0) {
    try {
      await notifyNewHabits(newUnlinkedTasks);
    } catch (e) {
      LOG.info("failed to send new habit notification", { error: String(e) });
    }
  }

  Storage.Tasks.write([...storedTasks, ...recentlyCompletedTasks]);
  Storage.LastSync.write(new Date())
}

function getAPIKey(): string {
  const apiKey = Storage.ApiKey.read();
  if (!apiKey) {
    throw new Error("API key not set");
  }
  return apiKey;
}

function redactTasks(tasks: Task[]): StructuredLog {
  return tasks.map(t => ({
    id: t.id,
    completedAt: new Date(t.completedAt ?? 0).toISOString(),
    ignored: t.ignored,
    habit: t.habit ? { id: t.habit.id, action: t.habit.action } : undefined,
  }));
}

function ensure(condition: boolean, message: string, attributes: StructuredLog = {}) {
  if (!condition) {
    LOG.info(message, attributes);
  }
  return condition;
}

function ensureCompletedSinceLastSync(task: Task, stored: Task): boolean {
  const storedCompletedAt = new Date(stored.completedAt ?? 0);
  const taskCompletedAt = new Date(task.completedAt ?? 0);
  return ensure(storedCompletedAt < taskCompletedAt, "skip: already recorded", {
    "task.id": task.id,
    "stored.completedAt": storedCompletedAt.toISOString(),
    "task.completedAt": taskCompletedAt.toISOString(),
  })
}

async function recordHabitUpdate(task: Task, habitId: string, habitAction: string) {
  LOG.info("habit updated", {
    "task.id": task.id,
    "habit.id": habitId,
    "habit.action": habitAction
  });
  await LoopHabitModule.takeHabitAction(habitId, habitAction);
}

async function notifyNewHabits(tasks: Task[]) {
  const count = tasks.length;
  const title = count === 1
    ? `Link "${tasks[0].title}" to a habit`
    : `${count} recurring tasks need to be linked`;
  const body = count === 1
    ? "Tap to open the app and link this recurring task to a habit."
    : tasks.map(t => `• ${t.title}`).join("\n");
  LOG.info("new habits found", { taskCount: count });
  await NotificationModule.sendNotification(
    NEW_HABIT_CHANNEL_ID,
    NEW_HABIT_CHANNEL_NAME,
    NEW_HABIT_NOTIFICATION_ID,
    title,
    body,
  );
}