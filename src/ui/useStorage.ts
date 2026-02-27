import { Storage } from '../lib/Storage';
import { Task } from '../types';
import { useState } from 'react';
import { normalize } from '../lib/normalize';

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
