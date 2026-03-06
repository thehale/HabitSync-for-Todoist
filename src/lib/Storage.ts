import { MMKV } from "react-native-mmkv";
import { SyncLogEntry, Task } from "../types";

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
const LAST_SYNC_DATE_STORAGE_ID = 'todoist.lastSync'
const SYNC_LOGS_STORAGE_ID = 'todoist.syncLogs'
const MAX_SYNC_LOGS = 100


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
  },
  LastSync: {
    read: (): Date => {
      const date = _storage.read(LAST_SYNC_DATE_STORAGE_ID)
      return date ? new Date(JSON.parse(date)) : new Date("1970-01-01")
    },
    write: (date: Date) => 
      _storage.write(LAST_SYNC_DATE_STORAGE_ID, JSON.stringify(date))
  },
  SyncLogs: {
    read: (): SyncLogEntry[] => {
      const logs = _storage.read(SYNC_LOGS_STORAGE_ID)
      return logs ? JSON.parse(logs) : []
    },
    append: (entry: SyncLogEntry) => {
      const logs = Storage.SyncLogs.read()
      const updated = [entry, ...logs].slice(0, MAX_SYNC_LOGS)
      _storage.write(SYNC_LOGS_STORAGE_ID, JSON.stringify(updated))
    },
  },
}