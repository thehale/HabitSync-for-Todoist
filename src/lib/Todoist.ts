import { Task, TodoistTask } from "../types";

async function queryRawTasks(apiToken: string, since: Date): Promise<TodoistTask[]> {
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

export async function queryTasks(apiToken: string, since: Date): Promise<Task[]> {
  const tasks = await queryRawTasks(apiToken, since);
  return tasks.map(i => ({
    id: i?.item_object?.id,
    occurrenceId: i.id,
    title: i?.item_object?.content,
    completedAt: new Date(i.completed_at),
    isRecurring: i?.item_object?.due?.is_recurring,
  }))
    .filter(i => i.isRecurring)
}
