// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { createValue } from "react-native-expressive";
import { Storage } from "../lib/Storage";

const { store, useValue } = createValue<string>("");
const listener = () => Storage.ApiKey.write(store.getSnapshot());

export function initializeApiKey() {
	store.set(Storage.ApiKey.read());
	store.subscribe(listener);
}

export { store as apiKeyStore }

export function useApiKey() {
	const { value: apiKey, store: apiKeyStore } = useValue();
	return { apiKey, apiKeyStore };
};
