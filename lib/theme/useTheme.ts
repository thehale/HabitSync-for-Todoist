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

const themeStore = new KeyValueStore()
const keys = { theme: "theme" }

const DEFAULT_THEME = Green;
const stringifiedDefaultTheme = JSON.stringify(DEFAULT_THEME);

const definitions = {
	theme: {
		default: DEFAULT_THEME,
		validate: (_value: Theme) => true, // If it passes TypeScript, it's valid
		update: async (value: Theme) => themeStore.put(keys.theme, JSON.stringify(value)),
		read: async () => JSON.parse(await themeStore.read(keys.theme, stringifiedDefaultTheme)) as Theme,
	} satisfies Setting<Theme>
} satisfies Settings

const { useSettings } = createSettings(definitions)

function initTheme(theme: Theme) {
	themeStore.put(keys.theme, JSON.stringify(theme));
}

function useTheme() {
	const [settings, updateSettings] = useSettings('useTheme');
	const setTheme = (theme: Theme) => updateSettings({ theme });
	const resetTheme = () => updateSettings({ theme: DEFAULT_THEME });
	return [settings.theme, setTheme, resetTheme] as const;
}

export { initTheme, useTheme };