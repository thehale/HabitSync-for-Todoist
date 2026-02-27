import { Task, TodoistActivity } from "../types";

export async function queryTasks(apiToken: string, since: Date): Promise<Task[]> {
  const tasks = await queryRawTasks(apiToken, since);
  return tasks.map(i => ({
    id: i.object_id,
    occurrenceId: i.object_id,
    title: i.extra_data.content,
    completedAt: new Date(i.event_date),
    isRecurring: i.extra_data?.is_recurring ?? false,
  })).filter(i => i.isRecurring)
}

async function queryRawTasks(apiToken: string, since: Date): Promise<TodoistActivity[]> {
  if (!apiToken) {
    return [] as TodoistActivity[];
  }
  let response = await fetchActivities(apiToken, since);
  let text = await response.text();
  if (!response.ok) {
    throw new Error(`Todoist API error: ${response.status} ${response.statusText}\n${text}`);
  }
  return parseResponse(text).results as TodoistActivity[];
}

async function fetchActivities(apiToken: string, since: Date) {
  return await fetch(
    'https://api.todoist.com/api/v1/activities?' +
    new URLSearchParams({
      limit: '100',
      object_type: 'item',
      event_type: 'completed',
      date_from: new Date(since.getTime()).toISOString(),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
    },
  );
}

function parseResponse(text: string) {
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`Failed to parse response: ${text}`);
  }
}