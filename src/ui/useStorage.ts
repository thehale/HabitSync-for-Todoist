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
  const dedupTasks = (tasks: Task[]) => Array.from(new Map(tasks.map(task => [task.id, task])).values());
  const sortTasks = (tasks: Task[]) => tasks.sort((a, b) => (a.ignored ? 1 : 0) - (b.ignored ? 1 : 0) || (a.habit ? 1 : 0) - (b.habit ? 1 : 0) || a.title.localeCompare(b.title));
  const [tasks, setTasks] = useState<Task[]>(sortTasks(dedupTasks(Storage.Tasks.read())));
  const saveTasks = (latestTasks: Task[]) => {
    const dedupedTasks = sortTasks(dedupTasks(latestTasks));
    Storage.Tasks.write(dedupedTasks);
    setTasks(dedupedTasks);
  }
  return [tasks, saveTasks] as const;
}