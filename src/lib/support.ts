// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Alert, Linking } from "react-native";
import { StructuredLog } from "./lenador";

export function requestSupport(logs: StructuredLog[]) {
	const subject = "HabitSync for Todoist | Support Request";
	const recipient = "support@jhale.dev";
	const body = (
		"Please describe the issue you are seeing:" + 
		"\n\n\n\n\n" + 
		history(logs)
	);

	sendEmail(recipient, subject, body);
}

function history(logs: StructuredLog[]) {
	if (logs.length === 0) {
		return "Sync History: None";
	} else {
		return "Sync History:\n" + logs.map(log => JSON.stringify(log)).join('\n');
	}
}

async function sendEmail(recipient: string, subject: string, body: string) {
	try {
		await Linking.openURL(mailto(recipient, subject, body));
	} catch {
		Alert.alert('Could not open your email app.');
	}
}

function mailto(recipient: string, subject: string, body: string) {
	const limitedBody = body.slice(0, 12000);
	return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(limitedBody)}`;
}