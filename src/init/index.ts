// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { initializeApiKey } from "../values/ApiKey";
import { initializeLastSync } from "../values/LastSync";
import { initializeTasks } from "../values/Tasks";
import { initializeLogs } from "../values/Logs";
import { initializeTheme } from "./initializeTheme";
import { initPurchases } from "../lib/purchases/init";

export function init() {
	initPurchases();
	initializeApiKey();
	initializeLastSync();
	initializeTasks();
	initializeLogs();
	initializeTheme();
}