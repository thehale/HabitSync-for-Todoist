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
		history([...logs].reverse())
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

// RFC 6068 defines no maximum length for `mailto:` URIs.
//
// In practice, Android passes the body via Intent EXTRA_TEXT, so the limiting
// factor is the Binder IPC transaction buffer (~1 MB pool).  Most email
// clients handle several hundred KB of body text without issue.
//
// We limit to 50,000 raw characters (≈ ~150 KB after worst-case-scenario
// encodeURIComponent) and reduce the limit on each retry so that restrictive
// OEM/ROM builds still get as many logs as possible rather than nothing at all.
//
// Sources:
//   - RFC 6068 §2 (no length limit): https://www.rfc-editor.org/rfc/rfc6068
//   - Android Binder limit (~1 MB): https://developer.android.com/reference/android/os/TransactionTooLargeException
const MAX_BODY_LENGTH = 50000;
const MAX_ATTEMPTS = 10;

async function sendEmail(recipient: string, subject: string, body: string) {
	let attempts = 0;
	let noEmailSent = true;
	
	while (noEmailSent && attempts < MAX_ATTEMPTS) {
		try {
			let limit = MAX_BODY_LENGTH - MAX_BODY_LENGTH * (attempts / MAX_ATTEMPTS);
			await Linking.openURL(mailto(recipient, subject, body.slice(0, limit)));
			noEmailSent = false;
		} catch (error) {
			attempts++;
		}
	}
	
	if (noEmailSent) {
		Alert.alert(`Could not open your email app.\n\nPlease email ${recipient} directly.`);
	}
}

function mailto(recipient: string, subject: string, body: string) {
	return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}