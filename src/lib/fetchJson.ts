// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

type JsonFetcher = (input: RequestInfo, init?: RequestInit) => Promise<any>;

const fetchJSON: JsonFetcher = async (input, init) => {
	const response = await fetch(input, init);
	const text = await response.text();
	const log = {
		request: { url: input.toString() },
		response: {
			status: response.status,
			statusText: response.statusText,
			body: text,
		}
	}
	if (!response.ok) {
		throw new Error(JSON.stringify({...log, message: "Request failed"}));
	}
	try {
		const json = JSON.parse(text);
		console.trace({...log, message: "Request succeeded"})
		return json;
	} catch (e) {
		throw new Error(JSON.stringify({...log, message: "Failed to parse response"}));
	}
}

export default fetchJSON;