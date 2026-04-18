// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

type StructuredPrimitive = string | boolean | number | StructuredLog
export type StructuredValue = StructuredPrimitive | StructuredPrimitive[] | (StructuredPrimitive)[]
export type StructuredLog = { [key: string]: StructuredValue | StructuredValue[]};

interface LenadorLog extends StructuredLog {
	events: StructuredLog[];
}

export class Lenador {
	#log: LenadorLog = {
		'events': [] as StructuredLog[],
	};

	save(fn: (message: StructuredLog) => void) {
		fn(this.#log);
	}

	debug(message: string, attributes: StructuredLog = {}) {
		this.event(message, { ...attributes, 'log.level': 'debug' });
	}

	info(message: string, attributes: StructuredLog = {}) {
		this.event(message, { ...attributes, 'log.level': 'info' });
	}

	warn(message: string, attributes: StructuredLog = {}) {
		this.event(message, { ...attributes, 'log.level': 'warn' });
	}

	error(message: string, attributes: StructuredLog = {}) {
		this.event(message, { ...attributes, 'log.level': 'error' });
	}

	event(message: string, attributes: StructuredLog = {}) {
		const event: StructuredLog = { ...attributes, message };
		this.#log.events.push({
			timestamp: new Date().toISOString(),
			...event,
		});
	}

	record(attributes: StructuredLog) {
		Object.entries(attributes).forEach(([key, value]) => {
			this.#log[key] = value;
		});
	}
}

