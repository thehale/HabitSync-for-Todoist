// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { useEffect, useState } from "react";

export function useAsyncState<T>(defaultValue: T, fn: () => Promise<T>, deps: any[] = []) {
  const [state, setState] = useState<T>(defaultValue);
  useEffect(() => {
    (async () => setState(await fn()))();
  }, deps);
  return state;
}