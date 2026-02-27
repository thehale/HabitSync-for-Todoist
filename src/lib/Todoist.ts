import { Task, TodoistActivity } from "../types";
import fetchJSON from "./fetchJson";

export async function queryTasks(apiToken: string, since: Date): Promise<Task[]> {
  const activities = await queryActivities(apiToken, since);
  return activities.map(i => ({
    id: i.object_id,
    occurrenceId: i.object_id,
    title: i.extra_data.content,
    completedAt: new Date(i.event_date),
    isRecurring: i.extra_data?.is_recurring ?? false,
  })).filter(i => i.isRecurring)
}

async function queryActivities(apiToken: string, since: Date): Promise<TodoistActivity[]> {
  const limitedSince = new Date(Date.now() - 1 * DAYS);
  if (since < limitedSince) {
    since = limitedSince;
  }
  const json = await fetchJSON(
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
  return json.results as TodoistActivity[];
}

const MILLISECONDS = 1;
const SECONDS = MILLISECONDS * 1000;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;
