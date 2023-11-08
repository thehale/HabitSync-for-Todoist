import { MMKV } from 'react-native-mmkv';
import { Task } from './types';
import { useState } from 'react';

const storage = new MMKV();

export function useStorage() {
  return {
    keys: () => storage.getAllKeys(),
    exists: (key: string) => storage.contains(key),
    read: (key: string) => storage.getString(key),
    write: (key: string, value: string) => storage.set(key, value),
    remove: (key: string) => storage.delete(key),
  }
}

export function useApiKey() {
  const API_KEY_STORAGE_ID = 'todoist.apiKey'
  const storage = useStorage();
  const storedKey = storage.read(API_KEY_STORAGE_ID);
  const [apiKey, setApiKey] = useState<string>(storedKey || '');
  const saveKey = (key: string) => {
    storage.write(API_KEY_STORAGE_ID, key);
    setApiKey(key);
  }
  return [apiKey, saveKey] as const;
}

export function useTasks() {
  const TASKS_STORAGE_ID = 'todoist.tasks'
  const storage = useStorage();
  const storedTasks = storage.read(TASKS_STORAGE_ID);
  const [tasks, setTasks] = useState<Task[]>(storedTasks ? JSON.parse(storedTasks) : []);
  const saveTasks = (tasks: Task[]) => {
    storage.write(TASKS_STORAGE_ID, JSON.stringify(tasks));
    setTasks(tasks);
  }
  return [tasks, saveTasks] as const;
}