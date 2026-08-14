// Copyright (c) 2026 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { MMKV } from "react-native-mmkv";
import type { ColorScheme } from "react-native-expressive";
import { PRODUCTS } from "./purchases/products";
import type { ThemeProduct } from "./purchases/ThemeProduct";
import { Task } from "../types";
import { HOURS } from "./time";
import { StructuredLog } from "./lenador";
import { normalize } from "./normalize";
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
const LOGS_STORAGE_ID = 'logs.history'
const THEME_STORAGE_ID = 'theme.material'
const SCHEME_STORAGE_ID = 'theme.scheme'


export const Storage = {
  ..._storage,
  ApiKey: {
    read: () => _storage.read(API_KEY_STORAGE_ID) || '',
    write: (key: string) => _storage.write(API_KEY_STORAGE_ID, key),
  },
  Tasks: {
    read: (): Task[] => {
      const raw = _storage.read(TASKS_STORAGE_ID)
      const tasks = raw ? JSON.parse(raw) : [];
      return normalize(tasks);
    },
    write: (tasks: Task[]) =>
      _storage.write(TASKS_STORAGE_ID, JSON.stringify(normalize(tasks)))
  },
  LastSync: {
    read: (): Date => {
      const date = _storage.read(LAST_SYNC_DATE_STORAGE_ID)
      return date ? new Date(JSON.parse(date)) : new Date("1970-01-01")
    },
    write: (date: Date) => 
      _storage.write(LAST_SYNC_DATE_STORAGE_ID, JSON.stringify(date))
  },
  Logs: {
    read: (): StructuredLog[] => {
      const raw = _storage.read(LOGS_STORAGE_ID);
      const logs = (raw ? JSON.parse(raw) : []) as StructuredLog[];
      
      const cutoff = new Date(Date.now() - 48 * HOURS).toISOString();
      return logs.filter(entry => entry.timestamp > cutoff);
    },
    write: (logs: StructuredLog[]) => 
      _storage.write(LOGS_STORAGE_ID, JSON.stringify(logs))
  },
  ThemeProduct: {
    read: (): ThemeProduct | undefined =>
      PRODUCTS.find(t => t.themeDefinition.name === _storage.read(THEME_STORAGE_ID)),
    write: (product: ThemeProduct) => _storage.write(THEME_STORAGE_ID, product.themeDefinition.name),
  },
  Scheme: {
    read: (): ColorScheme =>
      (_storage.read(SCHEME_STORAGE_ID) as ColorScheme | undefined) ?? 'system',
    write: (scheme: ColorScheme) => _storage.write(SCHEME_STORAGE_ID, scheme),
  }
}