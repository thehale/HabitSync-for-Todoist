// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { useCallback, useSyncExternalStore } from "react"

import { Settings } from "./types"
import { SettingsStore } from "./SettingsStore"

export default function createSettings<S extends Settings>(definitions: S) {
	const store = new SettingsStore(definitions);

	async function initSettings() {
		const entries = await Promise.all(
			Object.entries(definitions).map(async ([key, setting]) => [key, await setting.read()])
		);
		store.update(Object.fromEntries(entries));
	}

	function useSettings(callerName: string = 'settings') {
		const subscribe = useCallback<Parameters<typeof useSyncExternalStore>[0]>((listener) => store.subscribe(listener, callerName), [callerName]);
		const getSnapshot = useCallback(() => store.getSnapshot(), []);
		
		const snapshot = useSyncExternalStore(subscribe, getSnapshot);
		const update = (updates: Partial<typeof snapshot>) => store.update(updates);
		const resetToDefaults = useCallback(() => store.reset(), [])
		
		return [snapshot, update, resetToDefaults] as const;
	}

	return { initSettings, useSettings }

}
