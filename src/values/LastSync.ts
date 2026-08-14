// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createValue } from "react-native-expressive";
import { Storage } from "../lib/Storage";

const { store, useValue } = createValue<Date>(new Date(0));
const listener = () => Storage.LastSync.write(store.getSnapshot());

export function initializeLastSync() {
	store.set(Storage.LastSync.read());
	store.subscribe(listener);
}

export { store as lastSyncStore}

export function useLastSync() {
	const { value: lastSync, store: lastSyncStore } = useValue();
	return { lastSync, lastSyncStore };
}
