// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

export interface Setting<Value> {
	default: Value;
	validate: (value: Value) => boolean;
	update: (value: Value) => Promise<void>;
	read: () => Promise<Value>;
}

export type Settings = Record<string, Setting<any>>;
