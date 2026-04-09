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
    setApiKey(Storage.ApiKey.read());
  }
  return [apiKey, saveKey] as const;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(Storage.Tasks.read());
  const saveTasks = (latestTasks: Task[]) => {
    Storage.Tasks.write(latestTasks);
    setTasks(Storage.Tasks.read());
  }
  return [tasks, saveTasks] as const;
}
