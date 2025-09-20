// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import structuredClone from '@ungap/structured-clone';

export class NamedSubscriberStore<State extends Record<string, any>> {
	state: State
	validKeys: Set<keyof State>
	listeners = new Map<string, Array<Function>>()
	snapshot: State | null = null

	constructor(defaultState: State) {
		this.state = defaultState
		this.validKeys = new Set(Object.keys(defaultState))
	}

	subscribe(callback: Function, name: string = "unknown") {
		const namedListeners = this.listeners.get(name) ?? []
		namedListeners.push(callback)
		this.listeners.set(name, namedListeners)

		const unsubscribe = () => {
			const listeners = this.listeners.get(name) ?? []
			this.listeners.set(name, listeners.filter(l => l !== callback))
		}
		return unsubscribe
	}

	update(updates: Partial<State>) {
		let changed = false
		for (const key in updates) {
			if (this.validKeys.has(key) && updates[key] !== undefined && updates[key] !== this.state[key] && this.isValidUpdate(key, updates[key])) {
				this.state[key] = updates[key]
				this.onUpdate(key, updates[key])
				changed = true
			}
		}
		if (changed) {
			this.snapshot = null // Invalidate snapshot to ensure fresh data on next getSnapshot
			this.listeners.forEach(batch => batch.forEach(notify => notify()))
		}
	}

	/** Assesses if the setting can be assigned the value */
	protected isValidUpdate<S extends keyof State>(setting: S, value: State[S]): boolean { // eslint-disable-line @typescript-eslint/no-unused-vars
		return true
	}
	
	
	/** Allows child classes to trigger additional effects after successful updates (e.g. sync external stores) */
	protected onUpdate<S extends keyof State>(setting: S, value: State[S]) { }  // eslint-disable-line @typescript-eslint/no-unused-vars

	getSnapshot(): State {
		if (this.snapshot === null) this.snapshot = structuredClone(this.state)
		return this.snapshot
	}

}