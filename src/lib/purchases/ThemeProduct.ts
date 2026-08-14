// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import * as revenuecat from "./revenuecat";
import type { MaterialThemeDefinition } from "react-native-expressive";

export class ThemeProduct {
  themeDefinition: MaterialThemeDefinition;
  entitlement: string;
  product: string;
  free?: boolean;

  constructor({themeDefinition, entitlement, product, free}: {themeDefinition: MaterialThemeDefinition, entitlement: string, product: string, free?: boolean}) {
    this.themeDefinition = themeDefinition;
    this.entitlement = entitlement;
    this.product = product;
    this.free = free;
  }

  async isEntitled() {
    return this.free ?? await revenuecat.isEntitledTo(this.entitlement);
  }

  async price() {
    return await revenuecat.priceOf(this.product);
  }

	async purchase() {
		await revenuecat.purchase(this.product);
	}
}