// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Task } from "../types";

export function normalize(tasks: Task[]): Task[] {
  return sort(deduplicate(tasks));
}

function sort(tasks: Task[]): Task[] {
  return tasks.sort(
    (a, b) => 
      (a.ignored ? 1 : 0) - (b.ignored ? 1 : 0) 
      || (a.habit ? 1 : 0) - (b.habit ? 1 : 0) 
      || a.title.localeCompare(b.title)
  );
}


function deduplicate(tasks: Task[]): Task[] {
  tasks = deduplicator(tasks, t => t.occurrenceId, chooseMostRecent);
  tasks = deduplicator(tasks, t => t.title, chooseMostRecent);
  return tasks;
}

type TaskChoice = [keep: Task, discard: Task];
const chooseMostRecent = (a: Task, b: Task) => a.completedAt > b.completedAt ? [a, b] as TaskChoice : [b, a] as TaskChoice;

function deduplicator(tasks: Task[], key: (task: Task) => string, choose: (a: Task, b: Task) => TaskChoice): Task[] {
  const map = new Map<string, Task>();
  for (const task of tasks) {
    const k = key(task);
    const existing = map.get(k);
    if (!existing) {
      map.set(k, task);
    } else {
      const [keep, discard] = choose(existing, task);
      map.set(k, {
        ...keep,
        habit: keep.habit || discard.habit,
        ignored: keep.ignored || discard.ignored,
      });
    }
  }
  return Array.from(map.values());
}