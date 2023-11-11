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
  const [tasks, setTasks] = useState<Task[]>(Storage.Tasks.read());
  const saveTasks = (tasks: Task[]) => {
    Storage.Tasks.write(tasks);
    setTasks(tasks);
  }
  return [tasks, saveTasks] as const;
}