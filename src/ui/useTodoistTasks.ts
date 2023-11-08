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
  return (await tasks.json())['items'] as TodoistTask[];
}

function defaultSinceDate(): Date {
  return new Date(Date.now() - 1 * DAYS);
}



export function useTodoistTasks(apiToken: string, since?: Date): PersistentTask[] {
  // TODO handle re-querying tasks after persistence...
  let sinceDate = since || defaultSinceDate();
  const [tasks, setTasks] = useTasks();
  useEffect(() => {
    if (tasks.length === 0) {
      queryTasks(apiToken, sinceDate).then(tasks => {
        const items = tasks
          .map(i => ({
            id: i.id,
            objectId: i?.item_object?.id,
            title: i?.item_object?.content,
            completedAt: new Date(i.completed_at),
            isRecurring: i?.item_object?.due?.is_recurring,
          }))
          .filter(i => i.isRecurring);
        setTasks(items);
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