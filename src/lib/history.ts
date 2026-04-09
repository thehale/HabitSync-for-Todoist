// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StructuredLog } from "./lenador";

export function humanSummary(log: StructuredLog): string {
	return `${humanTimestamp(log)}\n${humanEvents(log)}`;
}

function humanTimestamp(log: StructuredLog): string {
	if (log.timestamp) {
		return new Date(log.timestamp as number).toLocaleString();
	} else {
		return "Unknown time";
	}
}

function humanEvents(log: StructuredLog): string {
	const events = log.events as StructuredLog[] || [];

	const grouped = events.reduce((acc: { [key: string]: number }, event) => {
		const message = event.message as string || "unknown event";
		acc[message] = (acc[message] || 0) + 1;
		return acc;
	}, {});

	if (events.length > 0) {
		return Object.entries(grouped)
			.map(([message, count]) => count > 1 ? `${message}: ${count}` : message)
			.join("\n");
	} else {
		return "No events";
	}
}