import { LoopHabit, PersistentTask, TodoistTask } from "./types";

import { useEffect } from "react";
import { useTasks } from "./useStorage";

const MILLIS = 1;
const SECONDS = MILLIS * 1000;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;

async function queryTasks(apiToken: string, since: Date): Promise<TodoistTask[]> {
  let tasks = await fetch(
    'https://api.todoist.com/sync/v9/completed/get_all?' +
    new URLSearchParams({
      since: new Date(since.getTime()).toISOString(),
      limit: '200',
      annotate_items: 'true',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
    },
  );
  const json = await tasks.json();
  if (json['error']) {
    throw new Error(JSON.stringify(json));
  }
  return json['items'] as TodoistTask[];
}

function defaultSinceDate(): Date {
  return new Date(Date.now() - 1 * DAYS);
}

let LAST_API_CALL = 0;
let DURATION_BETWEEN_API_CALLS = 10 * SECONDS;

export function useTodoistTasks(apiToken: string, since?: Date): PersistentTask[] {
  let sinceDate = since || defaultSinceDate();
  const [tasks, setTasks] = useTasks();
  useEffect(() => {
    if (LAST_API_CALL + DURATION_BETWEEN_API_CALLS < Date.now()) {
      queryTasks(apiToken, sinceDate).then(todoistTasks => {
        const existingIds = new Set(tasks.map(t => t.objectId));
        const items = todoistTasks
          .map(i => ({
            id: i.id,
            objectId: i?.item_object?.id,
            title: i?.item_object?.content,
            completedAt: new Date(i.completed_at),
            isRecurring: i?.item_object?.due?.is_recurring,
          }))
          .filter(i => i.isRecurring).filter(i => !existingIds.has(i.objectId));
        const newItems = [...items, ...tasks].sort((a, b) => a.title.localeCompare(b.title));
        setTasks(newItems);
      })
        .catch(error => console.error(error));
    }
  });
  return tasks.map(t => ({
    ...t,
    setHabit: (habit?: LoopHabit) => {
      const newTasks = tasks.map(task => {
        if (task.id === t.id) {
          return { ...task, habit };
        }
        return task;
      });
      setTasks(newTasks);
    },
  }));
}