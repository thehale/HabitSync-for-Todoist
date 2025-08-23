// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import structuredClone from '@ungap/structured-clone';

class AlreadySubscribedError extends Error { }

export class NamedSubscriberStore<State extends Record<string, any>> {
	state: State
	validKeys: Set<keyof State>
	listeners = new Map()
	snapshot: State | null = null

	constructor(defaultState: State) {
		this.state = defaultState
		this.validKeys = new Set(Object.keys(defaultState))
	}

	subscribe(name: string, callback: Function) {
		if (this.listeners.has(name) && this.listeners.get(name) !== callback) {
			throw new AlreadySubscribedError()
		} else {
			this.listeners.set(name, callback)
		}
		const unsubscribe = () => this.listeners.delete(name)
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
			this.listeners.forEach((notify) => notify())
		}
	}

	/** Assesses if the setting can be assigned the value */
	protected isValidUpdate<S extends keyof State>(setting: S, value: State[S]): boolean {
		return true
	}
	
	/** Allows child classes to trigger additional effects after successful updates (e.g. sync external stores) */
	protected onUpdate<S extends keyof State>(setting: S, value: State[S]) { }

	getSnapshot(): State {
		if (this.snapshot === null) this.snapshot = structuredClone(this.state)
		return this.snapshot
	}

}