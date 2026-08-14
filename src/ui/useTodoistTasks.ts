// Copyright (c) 2026 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { LoopHabit, PersistentTask } from "../types";
import { useApiKey } from "../values/ApiKey";
import { useTasks } from "../values/Tasks"; 

import { queryTasks } from "../lib/Todoist";
import { useEffect, useMemo } from "react";

import { DAYS, SECONDS } from "../lib/time";

function defaultSinceDate(): Date {
  return new Date(Date.now() - 1 * DAYS);
}

let LAST_API_CALL = 0;
let DURATION_BETWEEN_API_CALLS = 10 * SECONDS;

export function useTodoistTasks(since?: Date): PersistentTask[] {
  let sinceDate = since || defaultSinceDate();
  const { tasks, tasksStore } = useTasks();
  const { apiKey } = useApiKey();
  const buffer = Math.floor(new Date().getTime() / DURATION_BETWEEN_API_CALLS);

  useEffect(() => {
    let timeToRefresh = LAST_API_CALL + DURATION_BETWEEN_API_CALLS < Date.now();
    if (apiKey && timeToRefresh) {
      queryTasks(apiKey, sinceDate).then(res => {
        const existingIds = new Set(tasks.map(t => t.id));
        const items = res.filter(i => !existingIds.has(i.id));
        const newItems = [...items, ...tasks].sort((a, b) => a.title.localeCompare(b.title));
        tasksStore.set(newItems);
      })
        .catch(error => console.error(error));
    }
  }, [apiKey, buffer]); // eslint-disable-line react-hooks/exhaustive-deps

  return useMemo(() => tasks.map(t => ({
    ...t,
    setHabit: (habit?: LoopHabit) => {
      const newTasks = tasks.map(task => task.occurrenceId === t.occurrenceId ? { ...task, habit, ignored: false } : task);
      tasksStore.set(newTasks);
    },
    delete: () => {
      const newTasks = tasks.filter(task => task.occurrenceId !== t.occurrenceId);
      tasksStore.set(newTasks);
    },
    ignore: () => {
      const newTasks = tasks.map(task => task.occurrenceId === t.occurrenceId ? { ...task, habit: undefined, ignored: true } : task);
      tasksStore.set(newTasks);
    }
  })), [tasks, tasksStore]);
}