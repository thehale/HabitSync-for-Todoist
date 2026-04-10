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

// RFC 6068 defines no maximum length for mailto: URIs.
// In practice, Android passes the body via Intent EXTRA_TEXT, so the limiting
// factor is the Binder IPC transaction buffer (~1 MB total).  Most email
// clients handle several hundred KB of body text without issue.
// We start at 50,000 raw characters (≈ ~150 KB after encodeURIComponent) and
// halve the body on each retry so that restrictive OEM/ROM builds still get
// as many logs as possible rather than nothing at all.
// Sources:
//   - RFC 6068 §2 (no length limit): https://www.rfc-editor.org/rfc/rfc6068
//   - Android Binder limit (~1 MB): https://developer.android.com/reference/android/os/TransactionTooLargeException
//   - React Native Linking.openURL on Android uses startActivity with the
//     full URI as Intent data: https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Linking/Linking.android.js
const MAX_BODY_LENGTH = 50000;

async function sendEmail(recipient: string, subject: string, body: string) {
	let limit = MAX_BODY_LENGTH;
	while (limit > 0) {
		try {
			await Linking.openURL(mailto(recipient, subject, body.slice(0, limit)));
			return;
		} catch {
			limit = Math.floor(limit / 2);
		}
	}
	Alert.alert('Could not open your email app.');
}

function mailto(recipient: string, subject: string, body: string) {
	return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}