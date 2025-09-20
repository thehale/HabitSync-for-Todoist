// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import createSettings from "../settings/createSettings";
import type { Settings, Setting } from "../settings/types";
import KeyValueStore from "../stores/KeyValueStore";
import Green from "./Green";
import { ThemeDefinition, Theme } from "./types";
import { useColorScheme } from "react-native";

const themeStore = new KeyValueStore()
const keys = { theme: "theme", scheme: "scheme" }

const DEFAULT_THEME = Green;
const stringifiedDefaultTheme = JSON.stringify(DEFAULT_THEME);

type ColorScheme = "light" | "dark" | "system"
const DEFAULT_COLOR_SCHEME = "system"
const DEFAULT_SYSTEM_COLOR_SCHEME = "light"

const definitions = {
	theme: {
		default: DEFAULT_THEME,
		validate: (_value: ThemeDefinition) => true, // If it passes TypeScript, it's valid
		update: async (value: ThemeDefinition) => await themeStore.put(keys.theme, JSON.stringify(value)),
		read: async () => JSON.parse(await themeStore.read(keys.theme, stringifiedDefaultTheme)) as ThemeDefinition,
	} satisfies Setting<ThemeDefinition>,
	scheme: {
		default: "system" as ColorScheme,
		validate: (value: ColorScheme) => ["light", "dark", "system"].includes(value),
		update: async (value: ColorScheme) => await themeStore.put(keys.scheme, value),
		read: async () => await themeStore.read(keys.scheme, "system") as ColorScheme,
	} satisfies Setting<ColorScheme>
} satisfies Settings

const { useSettings } = createSettings(definitions)

function initTheme(theme: ThemeDefinition, scheme: ColorScheme) {
	themeStore.put(keys.theme, JSON.stringify(theme));
	themeStore.put(keys.scheme, scheme);
}

function useTheme() {
	const [settings, updateSettings] = useSettings('useTheme');
	const colorScheme = useColorScheme();

	const currentScheme = settings.scheme === "system" ? colorScheme ?? DEFAULT_SYSTEM_COLOR_SCHEME : settings.scheme;
	const colors = currentScheme === "dark" ? settings.theme.dark : settings.theme.light;

	return {
		theme: { fonts: settings.theme.fonts, colors } as Theme,
		setTheme: (theme: ThemeDefinition) => updateSettings({ theme }),
		setScheme: (scheme: ColorScheme) => updateSettings({ scheme }),
		resetTheme: () => updateSettings({ theme: DEFAULT_THEME, scheme: DEFAULT_COLOR_SCHEME }),
	}
}

export { initTheme, useTheme };