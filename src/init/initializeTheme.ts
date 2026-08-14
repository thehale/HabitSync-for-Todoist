// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, you can obtain one at https://mozilla.org/MPL/2.0/.

import { materialThemeStore } from "react-native-expressive";
import { Storage } from "../lib/Storage";
import { DEFAULT_PRODUCT, PRODUCTS } from "../lib/purchases/products";

export function initializeTheme() {
  void (async () => {
    loadScheme();
    await loadTheme();
  })();

  materialThemeStore.subscribe(() => {
    void (async () => {
      await persistTheme();
      persistScheme();
    })();
  });
}

function loadScheme() {
  materialThemeStore.setScheme(Storage.Scheme.read());
}

async function loadTheme() {
  const product = await readTheme();
  materialThemeStore.setThemeDefinition(product.themeDefinition);
}

async function readTheme() {
  let product = Storage.ThemeProduct.read() ?? DEFAULT_PRODUCT;
  return (await product.isEntitled()) ? product : DEFAULT_PRODUCT;
}

async function persistTheme() {
  const { themeDefinition } = materialThemeStore.getSnapshot();
  const product = PRODUCTS.find((p) => p.themeDefinition.name === themeDefinition.name);

  if (product && await product.isEntitled()) {
    Storage.ThemeProduct.write(product);
  }
}

function persistScheme() {
  Storage.Scheme.write(materialThemeStore.getSnapshot().scheme);
}
