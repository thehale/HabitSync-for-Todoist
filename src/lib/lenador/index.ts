// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Storage } from "../Storage";
import { Lenador, StructuredLog, StructuredValue } from "./lenador";

export type { StructuredLog, StructuredValue };

let logger = new Lenador();

export const LOG = {
	debug: (message: string, attributes?: StructuredLog) => { logger.debug(message, attributes); },
	info: (message: string, attributes?: StructuredLog) => { logger.info(message, attributes); },
	warn: (message: string, attributes?: StructuredLog) => { logger.warn(message, attributes); },
	error: (message: string, attributes?: StructuredLog) => { logger.error(message, attributes); },
	record: (attributes: StructuredLog) => { logger.record(attributes); },
	transaction: async (name: string, fn: Function) => {
		const oldLogger = logger;
		logger = new Lenador();
		logger.record({ transaction: name, "timezone.user": Intl.DateTimeFormat().resolvedOptions().timeZone });
		try {
			await fn();
		} catch (e) {
			logger.error(e instanceof Error ? `${e.constructor.name} | ${e.message}` : String(e));
			throw e;
		} finally {
			logger.save((message) => {
				console.debug(stringify(message));
				Storage.Logs.add(message);
			});
			logger = oldLogger;
		}
	}
}

function stringify(value: StructuredValue): string {
	if (typeof value === "string") {
		return value;
	} else if (Array.isArray(value)) {
		return `[${value.map(stringify).join(", ")}]`;
	} else if (typeof value === "object" && value !== null) {
		return JSON.stringify(value, null, 2);
	} else {
		return String(value);
	}
}