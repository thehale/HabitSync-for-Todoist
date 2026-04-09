import { NativeModules } from "react-native";
import { Storage } from "../lib/Storage";
import { queryTasks } from "../lib/Todoist"
import { MINUTES } from "../lib/time";
import { LOG, StructuredLog } from "../lib/lenador";
import { Task } from "../types";

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
  await LOG.transaction(`sync-${new Date().toISOString()}`, sync);
}

async function sync() {
  const apiToken = getAPIKey();
  const lastSync = Storage.LastSync.read();
  const queryDate = new Date(lastSync.getTime() - API_LAG_BUFFER);

  LOG.record({ lastSync: lastSync.toISOString(), queryDate: queryDate.toISOString() });

  const storedTasks = Storage.Tasks.read()
  const storedMap = new Map(storedTasks.map(t => [t.id, t]));

  const recentlyCompletedTasks = await queryTasks(apiToken, queryDate);
  recentlyCompletedTasks
    .filter(task => ensure(storedMap.has(task.id), "skip: not stored", { "task.id": task.id }))
    .map(task => [task, storedMap.get(task.id)!])
    .filter(([task, stored]) => ensure(stored.habit !== undefined, "skip: not linked", { "task.id": task.id }))
    .filter(([task, stored]) => ensureCompletedSinceLastSync(task, stored))
    .forEach(async ([task, stored]) => await recordHabitUpdate(task, stored.habit!.id, stored.habit!.action));

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

function ensure(condition: boolean, message: string, attributes: StructuredLog = {}) {
  if (!condition) {
    LOG.info(message, attributes);
  }
  return condition;
}

function ensureCompletedSinceLastSync(task: Task, stored: Task): boolean {
  return ensure(stored.completedAt < task.completedAt, "skip: already recorded", {
    "task.id": task.id,
    "task.completedAt": task.completedAt.toISOString(),
    "stored.completedAt": stored.completedAt.toISOString()
  })
}

async function recordHabitUpdate(task: Task, habitId: string, habitAction: string) {
  await LoopHabitModule.takeHabitAction(habitId, habitAction);
  LOG.info("habit updated", {
    "task.id": task.id,
    "habit.id": habitId,
    "habit.action": habitAction
  });
}