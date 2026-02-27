import { Storage } from '../lib/Storage';
import { Task } from '../types';
import { useState } from 'react';

export function useStorage() {
  return Storage;
}

export function useApiKey() {
  const [apiKey, setApiKey] = useState<string>(Storage.ApiKey.read());
  const saveKey = (key: string) => {
    Storage.ApiKey.write(key);
    setApiKey(key);
  }
  return [apiKey, saveKey] as const;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(normalize(Storage.Tasks.read()));
  const saveTasks = (latestTasks: Task[]) => {
    const normalizedTasks = normalize(latestTasks);
    Storage.Tasks.write(normalizedTasks);
    setTasks(normalizedTasks);
  }
  return [tasks, saveTasks] as const;
}

function normalize(tasks: Task[]): Task[] {
  return sort(deduplicate(tasks));
}

function sort(tasks: Task[]): Task[] {
  return tasks.sort(
    (a, b) => 
      (a.ignored ? 1 : 0) - (b.ignored ? 1 : 0) 
      || (a.habit ? 1 : 0) - (b.habit ? 1 : 0) 
      || a.title.localeCompare(b.title)
  );
}

function deduplicate(tasks: Task[]): Task[] {
  tasks = deduplicator(tasks, t => t.occurrenceId, chooseMostRecent);
  tasks = deduplicator(tasks, t => t.title, chooseMostRecent);
  return tasks;
}

type TaskChoice = [keep: Task, discard: Task];
const chooseMostRecent = (a: Task, b: Task) => a.completedAt > b.completedAt ? [a, b] as TaskChoice : [b, a] as TaskChoice;

function deduplicator(tasks: Task[], key: (task: Task) => string, choose: (a: Task, b: Task) => TaskChoice): Task[] {
  const map = new Map<string, Task>();
  for (const task of tasks) {
    const k = key(task);
    const existing = map.get(k);
    if (!existing) {
      map.set(k, task);
    } else {
      const [keep, discard] = choose(existing, task);
      map.set(k, {
        ...keep,
        habit: keep.habit || discard.habit,
        ignored: keep.ignored || discard.ignored,
      });
    }
  }
  return Array.from(map.values());
}