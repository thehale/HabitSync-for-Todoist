import { MMKV } from "react-native-mmkv";
import { Task } from "../types";

const mmkv = new MMKV();
const _storage = {
  keys: () => mmkv.getAllKeys(),
  exists: (key: string) => mmkv.contains(key),
  read: (key: string) => mmkv.getString(key),
  write: (key: string, value: string) => mmkv.set(key, value),
  remove: (key: string) => mmkv.delete(key),
};


const API_KEY_STORAGE_ID = 'todoist.apiKey'
const TASKS_STORAGE_ID = 'todoist.tasks'


export const Storage = {
  ..._storage,
  ApiKey: {
    read: () => _storage.read(API_KEY_STORAGE_ID) || '',
    write: (key: string) => _storage.write(API_KEY_STORAGE_ID, key),
  },
  Tasks: {
    read: (): Task[] => {
      const tasks = _storage.read(TASKS_STORAGE_ID)
      return tasks ? JSON.parse(tasks) : []
    },
    write: (tasks: Task[]) =>
      _storage.write(TASKS_STORAGE_ID, JSON.stringify(tasks))
  }
}