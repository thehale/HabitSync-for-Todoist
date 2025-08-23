
// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { NamedSubscriberStore } from "./_utils/NamedSubscriberStore";
import type { Settings } from "./types"

export class SettingsStore<S extends Settings> extends NamedSubscriberStore<{ [K in keyof S]: S[K]['default'] }> {
	settings: S;
	constructor(settings: S) {
		super(toDefaults(settings))
		this.settings = settings;
	}
	
	reset() {
		this.update(toDefaults(this.settings))
	}

	protected isValidUpdate<K extends keyof S>(setting: K, value: S[K]["default"]): boolean {
		return this.settings[setting].validate(value);
	}
	protected onUpdate<K extends keyof S>(setting: K, value: S[K]["default"]): void {
		this.settings[setting].update(value);
	}
}

function toDefaults<S extends Settings>(settings: S): { [K in keyof S]: S[K]['default'] } {
	// @ts-expect-error Object.fromEntries is type-lossy
	return Object.fromEntries(
		Object.entries(settings).map(([key, value]) => [key, value.default])
	)
}