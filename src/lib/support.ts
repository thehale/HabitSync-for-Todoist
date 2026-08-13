// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StructuredLog } from "./lenador";
import { Email } from "./email";

export function requestSupport(logs: StructuredLog[]) {
	const subject = "HabitSync for Todoist | Support Request";
	const recipient = "support@jhale.dev";
	const body = (
		"Please describe the issue you are seeing:" + 
		"\n\n\n\n\n" + 
		history([...logs].reverse())
	);

	new Email(subject, body).sendTo(recipient);
}

function history(logs: StructuredLog[]) {
	if (logs.length === 0) {
		return "Sync History: None";
	} else {
		return "Sync History:\n" + logs.map(log => JSON.stringify(log)).join('\n');
	}
}
