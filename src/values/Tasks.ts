// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createList } from "react-native-expressive";
import { Storage } from "../lib/Storage";
import { Task } from "../types";

const { store, useList } = createList<Task>([]);
const listener = () => Storage.Tasks.write(store.getSnapshot());

export function initializeTasks() {
	store.set(Storage.Tasks.read());
	store.subscribe(listener);
}

export { store as tasksStore} 

export function useTasks() {
	const { store } = useList();
	return { tasks: Storage.Tasks.read(), tasksStore: store };
}