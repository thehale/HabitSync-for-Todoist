import { LoopHabit, PersistentTask } from "../types";
import { useApiKey, useTasks } from "./useStorage";

import { queryTasks } from "../lib/Todoist";
import { useEffect } from "react";

const MILLIS = 1;
const SECONDS = MILLIS * 1000;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;


function defaultSinceDate(): Date {
  return new Date(Date.now() - 1 * DAYS);
}

let LAST_API_CALL = 0;
let DURATION_BETWEEN_API_CALLS = 10 * SECONDS;

export function useTodoistTasks(since?: Date): PersistentTask[] {
  let sinceDate = since || defaultSinceDate();
  const [tasks, setTasks] = useTasks();
  const [apiToken] = useApiKey();
  const buffer = Math.floor(new Date().getTime() / DURATION_BETWEEN_API_CALLS);

  useEffect(() => {
    let timeToRefresh = LAST_API_CALL + DURATION_BETWEEN_API_CALLS < Date.now();
    if (apiToken && timeToRefresh) {
      queryTasks(apiToken, sinceDate).then(res => {
        const existingIds = new Set(tasks.map(t => t.id));
        const items = res.filter(i => !existingIds.has(i.id));
        const newItems = [...items, ...tasks].sort((a, b) => a.title.localeCompare(b.title));
        setTasks(newItems);
      })
        .catch(error => console.error(error));
    }
  }, [apiToken, buffer]);

  return tasks.map(t => ({
    ...t,
    setHabit: (habit?: LoopHabit) => {
      const newTasks = tasks.map(task => {
        if (task.occurrenceId === t.occurrenceId) {
          return { ...task, habit };
        }
        return task;
      });
      setTasks(newTasks);
    },
    delete: () => {
      const newTasks = tasks.filter(task => task.occurrenceId !== t.occurrenceId);
      setTasks(newTasks);
    }
  }));
}