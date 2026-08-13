// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { ThemeProduct } from "./ThemeProduct";

export const PRODUCTS: Record<string, ThemeProduct> = {
  "material/red": new ThemeProduct({
    entitlement: "theme.material.red",
    product: "dev.jhale.todoisthabitsync.theme.material.red",
  }),
  "material/orange": new ThemeProduct({
    entitlement: "theme.material.orange",
    product: "dev.jhale.todoisthabitsync.theme.material.orange",
  }),
  "material/yellow": new ThemeProduct({
    entitlement: "theme.material.yellow",
    product: "dev.jhale.todoisthabitsync.theme.material.yellow",
  }),
  "material/green": new ThemeProduct({
    entitlement: "theme.material.green",
    product: "dev.jhale.todoisthabitsync.theme.material.green",
    free: true,
  }),
  "material/blue": new ThemeProduct({
    entitlement: "theme.material.blue",
    product: "dev.jhale.todoisthabitsync.theme.material.blue",
  }),
  "material/cyan": new ThemeProduct({
    entitlement: "theme.material.cyan",
    product: "dev.jhale.todoisthabitsync.theme.material.cyan",
  }),
  "material/pink": new ThemeProduct({
    entitlement: "theme.material.pink",
    product: "dev.jhale.todoisthabitsync.theme.material.pink",
  }),
};