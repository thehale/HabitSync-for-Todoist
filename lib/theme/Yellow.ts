// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// This theme comes from the React Native Paper demonstration app. Used under the terms of the MIT license.
// Source: https://github.com/callstack/react-native-paper/blob/ac3820a50fe1afb82c19cc0853a451e5c190b769/example/utils/index.ts

import type { Theme, ThemeColors } from "./types";

import DefaultFonts from "./DefaultFonts";

const LightYellow: ThemeColors = {
	primary: 'rgb(98, 98, 0)',
	onPrimary: 'rgb(255, 255, 255)',
	primaryContainer: 'rgb(234, 234, 0)',
	onPrimaryContainer: 'rgb(29, 29, 0)',
	secondary: 'rgb(96, 96, 67)',
	onSecondary: 'rgb(255, 255, 255)',
	secondaryContainer: 'rgb(231, 228, 191)',
	onSecondaryContainer: 'rgb(29, 29, 6)',
	tertiary: 'rgb(61, 102, 87)',
	onTertiary: 'rgb(255, 255, 255)',
	tertiaryContainer: 'rgb(191, 236, 216)',
	onTertiaryContainer: 'rgb(0, 33, 23)',
	error: 'rgb(186, 26, 26)',
	onError: 'rgb(255, 255, 255)',
	errorContainer: 'rgb(255, 218, 214)',
	onErrorContainer: 'rgb(65, 0, 2)',
	background: 'rgb(255, 251, 255)',
	onBackground: 'rgb(28, 28, 23)',
	surface: 'rgb(255, 251, 255)',
	onSurface: 'rgb(28, 28, 23)',
	surfaceVariant: 'rgb(230, 227, 209)',
	onSurfaceVariant: 'rgb(72, 71, 58)',
	outline: 'rgb(121, 120, 105)',
	outlineVariant: 'rgb(202, 199, 182)',
	shadow: 'rgb(0, 0, 0)',
	scrim: 'rgb(0, 0, 0)',
	inverseSurface: 'rgb(49, 49, 43)',
	inverseOnSurface: 'rgb(244, 240, 232)',
	inversePrimary: 'rgb(205, 205, 0)',
	elevation: {
		level0: 'transparent',
		level1: 'rgb(247, 243, 242)',
		level2: 'rgb(242, 239, 235)',
		level3: 'rgb(238, 234, 227)',
		level4: 'rgb(236, 233, 224)',
		level5: 'rgb(233, 230, 219)',
	},
	surfaceDisabled: 'rgba(28, 28, 23, 0.12)',
	onSurfaceDisabled: 'rgba(28, 28, 23, 0.38)',
	backdrop: 'rgba(49, 49, 37, 0.4)',
}

const DarkYellow: ThemeColors = {
	primary: 'rgb(205, 205, 0)',
	onPrimary: 'rgb(50, 50, 0)',
	primaryContainer: 'rgb(73, 73, 0)',
	onPrimaryContainer: 'rgb(234, 234, 0)',
	secondary: 'rgb(202, 200, 165)',
	onSecondary: 'rgb(50, 50, 24)',
	secondaryContainer: 'rgb(73, 72, 45)',
	onSecondaryContainer: 'rgb(231, 228, 191)',
	tertiary: 'rgb(164, 208, 189)',
	onTertiary: 'rgb(11, 55, 42)',
	tertiaryContainer: 'rgb(37, 78, 64)',
	onTertiaryContainer: 'rgb(191, 236, 216)',
	error: 'rgb(255, 180, 171)',
	onError: 'rgb(105, 0, 5)',
	errorContainer: 'rgb(147, 0, 10)',
	onErrorContainer: 'rgb(255, 180, 171)',
	background: 'rgb(28, 28, 23)',
	onBackground: 'rgb(230, 226, 217)',
	surface: 'rgb(28, 28, 23)',
	onSurface: 'rgb(230, 226, 217)',
	surfaceVariant: 'rgb(72, 71, 58)',
	onSurfaceVariant: 'rgb(202, 199, 182)',
	outline: 'rgb(147, 145, 130)',
	outlineVariant: 'rgb(72, 71, 58)',
	shadow: 'rgb(0, 0, 0)',
	scrim: 'rgb(0, 0, 0)',
	inverseSurface: 'rgb(230, 226, 217)',
	inverseOnSurface: 'rgb(49, 49, 43)',
	inversePrimary: 'rgb(98, 98, 0)',
	elevation: {
		level0: 'transparent',
		level1: 'rgb(37, 37, 22)',
		level2: 'rgb(42, 42, 21)',
		level3: 'rgb(48, 48, 21)',
		level4: 'rgb(49, 49, 20)',
		level5: 'rgb(53, 53, 20)',
	},
	surfaceDisabled: 'rgba(230, 226, 217, 0.12)',
	onSurfaceDisabled: 'rgba(230, 226, 217, 0.38)',
	backdrop: 'rgba(49, 49, 37, 0.4)',
}

const Yellow: Theme = {
	fonts: DefaultFonts,
	light: LightYellow,
	dark: DarkYellow,
}

export default Yellow;