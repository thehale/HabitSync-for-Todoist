// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import createSettings from "../settings/createSettings";
import type { Settings, Setting } from "../settings/types";
import KeyValueStore from "../stores/KeyValueStore";
import Green from "./Green";
import { Theme } from "./types";
import { useColorScheme } from "react-native";

const themeStore = new KeyValueStore()
const keys = { theme: "theme", scheme: "scheme" }

const DEFAULT_THEME = Green;
const stringifiedDefaultTheme = JSON.stringify(DEFAULT_THEME);

type ColorScheme = "light" | "dark" | "system"

const definitions = {
	theme: {
		default: DEFAULT_THEME,
		validate: (_value: Theme) => true, // If it passes TypeScript, it's valid
		update: async (value: Theme) => await themeStore.put(keys.theme, JSON.stringify(value)),
		read: async () => JSON.parse(await themeStore.read(keys.theme, stringifiedDefaultTheme)) as Theme,
	} satisfies Setting<Theme>,
	scheme: {
		default: "system" as ColorScheme,
		validate: (value: ColorScheme) => ["light", "dark", "system"].includes(value),
		update: async (value: ColorScheme) => await themeStore.put(keys.scheme, value),
		read: async () => await themeStore.read(keys.scheme, "system") as ColorScheme,
	} satisfies Setting<ColorScheme>
} satisfies Settings

const { useSettings } = createSettings(definitions)

function initTheme(theme: Theme, scheme: ColorScheme) {
	themeStore.put(keys.theme, JSON.stringify(theme));
	themeStore.put(keys.scheme, scheme);
}

function useTheme() {
	const [settings, updateSettings] = useSettings('useTheme');
	const colorScheme = useColorScheme();

	const scheme = settings.scheme === "system" ? colorScheme ?? "light" : settings.scheme;
	const theme = scheme === "dark" ? settings.theme.dark : settings.theme.light;

	return {
		theme: { fonts: settings.theme.fonts, colors: theme },
		setTheme: (theme: Theme) => updateSettings({ theme }),
		setScheme: (scheme: ColorScheme) => updateSettings({ scheme }),
		resetTheme: () => updateSettings({ theme: DEFAULT_THEME, scheme: "system" }),
	}
}

export { initTheme, useTheme };