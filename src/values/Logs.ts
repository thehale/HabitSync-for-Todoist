// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createList } from "react-native-expressive";
import { Storage } from "../lib/Storage";
import { StructuredLog } from "../lib/lenador";

const { store, useList } = createList<StructuredLog>([]);
const listener = () => Storage.Logs.write(store.getSnapshot());

export function initializeLogs() {
	store.set(Storage.Logs.read());
	store.subscribe(listener);
}

export { store as logsStore }

export function useLogs() {
	const { value: logs, store: logsStore } = useList();
	return { logs, logsStore };
}