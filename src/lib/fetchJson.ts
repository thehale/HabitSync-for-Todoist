// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

type JsonFetcher = (input: RequestInfo, init?: RequestInit) => Promise<any>;

const fetchJSON: JsonFetcher = async (input, init) => {
	const response = await fetch(input, init);
	const text = await response.text();
	if (!response.ok) {
		throw new Error(`HTTP error ${response.status} ${response.statusText}\n${text}`);
	}
	try {
		return JSON.parse(text);
	} catch (e) {
		throw new Error(`Failed to parse response: ${text}`);
	}
}

export default fetchJSON;