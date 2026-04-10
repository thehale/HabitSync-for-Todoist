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

async function sendEmail(recipient: string, subject: string, body: string) {
	try {
		await Linking.openURL(mailto(recipient, subject, body));
	} catch {
		Alert.alert('Could not open your email app.');
	}
}

function mailto(recipient: string, subject: string, body: string) {
	// RFC 6068 defines no maximum length for mailto: URIs.
	// In practice, Android passes the body via Intent EXTRA_TEXT, so the limiting
	// factor is the Binder IPC transaction buffer (~1 MB total).  Most email
	// clients handle several hundred KB of body text without issue.
	// We cap at 50 000 raw characters (≈ ~150 KB after encodeURIComponent in the
	// worst case) as a conservative upper bound.  Some OEM or ROM builds may
	// enforce a smaller limit; if the Intent is rejected the user will see
	// "Could not open your email app" and can try again — partial logs are
	// better than no logs at all.
	// Sources:
	//   - RFC 6068 §2 (no length limit): https://www.rfc-editor.org/rfc/rfc6068
	//   - Android Binder limit (~1 MB): https://developer.android.com/reference/android/os/TransactionTooLargeException
	//   - React Native Linking.openURL on Android uses startActivity with the
	//     full URI as Intent data: https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Linking/Linking.android.js
	const limitedBody = body.slice(0, 50000);
	return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(limitedBody)}`;
}