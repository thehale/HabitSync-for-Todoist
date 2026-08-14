// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { ThemeProduct } from "./ThemeProduct";
import {
  MaterialBlue, MaterialCyan, MaterialGreen, MaterialOrange,
  MaterialPink, MaterialRed, MaterialYellow,
} from "react-native-expressive";

export const PRODUCTS: ThemeProduct[] = [
  new ThemeProduct({
    themeDefinition: MaterialRed,
    entitlement: "theme.material.red",
    product: "dev.jhale.todoisthabitsync.theme.material.red",
  }),
  new ThemeProduct({
    themeDefinition: MaterialOrange,
    entitlement: "theme.material.orange",
    product: "dev.jhale.todoisthabitsync.theme.material.orange",
  }),
  new ThemeProduct({
    themeDefinition: MaterialYellow,
    entitlement: "theme.material.yellow",
    product: "dev.jhale.todoisthabitsync.theme.material.yellow",
  }),
  new ThemeProduct({
    themeDefinition: MaterialGreen,
    entitlement: "theme.material.green",
    product: "dev.jhale.todoisthabitsync.theme.material.green",
    free: true,
  }),
  new ThemeProduct({
    themeDefinition: MaterialBlue,
    entitlement: "theme.material.blue",
    product: "dev.jhale.todoisthabitsync.theme.material.blue",
  }),
  new ThemeProduct({
    themeDefinition: MaterialCyan,
    entitlement: "theme.material.cyan",
    product: "dev.jhale.todoisthabitsync.theme.material.cyan",
  }),
  new ThemeProduct({
    themeDefinition: MaterialPink,
    entitlement: "theme.material.pink",
    product: "dev.jhale.todoisthabitsync.theme.material.pink",
  }),
];

export const DEFAULT_PRODUCT = PRODUCTS.find(p => p.free)!;