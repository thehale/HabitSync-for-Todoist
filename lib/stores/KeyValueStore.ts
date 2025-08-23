// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { debounce, type DebouncedFunc } from 'lodash';

interface ExternalKeyValueStore {
	get: (key: string) => Promise<string | null>;
	set: (key: string, value: string) => Promise<void>;
}

export default class KeyValueStore {
	private external: ExternalKeyValueStore
	private setters = new Map<string, DebouncedFunc<(value: string) => Promise<void>>>();

	constructor(external?: ExternalKeyValueStore) {
		this.external = external ?? new InMemoryKeyValueStore()
	}

	async put(key: string, value: string): Promise<void> {
		if (!this.setters.has(key)) {
			const setter = async (value: string) => await this.external.set(key, value);
			this.setters.set(key, debounce(setter, 1000, { trailing: true }));
		}
		return this.setters.get(key)!(value);
	}

	async read(key: string, defaultValue: string): Promise<string> {
		const value = await this.external.get(key);
		return value ?? defaultValue;
	}
}

class InMemoryKeyValueStore implements ExternalKeyValueStore {
	private store = new Map<string, string>();

	async get(key: string): Promise<string | null> {
		return this.store.get(key) ?? null
	}

	async set(key: string, value: string): Promise<void> {
		this.store.set(key, value)
	}
}