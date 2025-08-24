// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// This theme comes from the React Native Paper demonstration app. Used under the terms of the MIT license.
// Source: https://github.com/callstack/react-native-paper/blob/ac3820a50fe1afb82c19cc0853a451e5c190b769/example/utils/index.ts

import type { ThemeColors, ThemeDefinition } from "./types";

import DefaultFonts from "./DefaultFonts";

const LightOrange: ThemeColors = {
	primary: 'rgb(133, 84, 0)',
	onPrimary: 'rgb(255, 255, 255)',
	primaryContainer: 'rgb(255, 221, 183)',
	onPrimaryContainer: 'rgb(42, 23, 0)',
	secondary: 'rgb(112, 91, 65)',
	onSecondary: 'rgb(255, 255, 255)',
	secondaryContainer: 'rgb(252, 222, 188)',
	onSecondaryContainer: 'rgb(40, 24, 5)',
	tertiary: 'rgb(83, 100, 62)',
	onTertiary: 'rgb(255, 255, 255)',
	tertiaryContainer: 'rgb(214, 233, 185)',
	onTertiaryContainer: 'rgb(18, 31, 3)',
	error: 'rgb(186, 26, 26)',
	onError: 'rgb(255, 255, 255)',
	errorContainer: 'rgb(255, 218, 214)',
	onErrorContainer: 'rgb(65, 0, 2)',
	background: 'rgb(255, 251, 255)',
	onBackground: 'rgb(31, 27, 22)',
	surface: 'rgb(255, 251, 255)',
	onSurface: 'rgb(31, 27, 22)',
	surfaceVariant: 'rgb(240, 224, 208)',
	onSurfaceVariant: 'rgb(80, 69, 57)',
	outline: 'rgb(130, 117, 104)',
	outlineVariant: 'rgb(212, 196, 181)',
	shadow: 'rgb(0, 0, 0)',
	scrim: 'rgb(0, 0, 0)',
	inverseSurface: 'rgb(53, 47, 42)',
	inverseOnSurface: 'rgb(249, 239, 231)',
	inversePrimary: 'rgb(255, 185, 92)',
	elevation: {
		level0: 'transparent',
		level1: 'rgb(249, 243, 242)',
		level2: 'rgb(245, 238, 235)',
		level3: 'rgb(242, 233, 227)',
		level4: 'rgb(240, 231, 224)',
		level5: 'rgb(238, 228, 219)',
	},
	surfaceDisabled: 'rgba(31, 27, 22, 0.12)',
	onSurfaceDisabled: 'rgba(31, 27, 22, 0.38)',
	backdrop: 'rgba(56, 47, 36, 0.4)',
}

const DarkOrange: ThemeColors = {
	primary: 'rgb(255, 185, 92)',
	onPrimary: 'rgb(70, 42, 0)',
	primaryContainer: 'rgb(101, 62, 0)',
	onPrimaryContainer: 'rgb(255, 221, 183)',
	secondary: 'rgb(223, 194, 162)',
	onSecondary: 'rgb(63, 45, 23)',
	secondaryContainer: 'rgb(87, 67, 43)',
	onSecondaryContainer: 'rgb(252, 222, 188)',
	tertiary: 'rgb(186, 205, 159)',
	onTertiary: 'rgb(38, 53, 20)',
	tertiaryContainer: 'rgb(60, 76, 40)',
	onTertiaryContainer: 'rgb(214, 233, 185)',
	error: 'rgb(255, 180, 171)',
	onError: 'rgb(105, 0, 5)',
	errorContainer: 'rgb(147, 0, 10)',
	onErrorContainer: 'rgb(255, 180, 171)',
	background: 'rgb(31, 27, 22)',
	onBackground: 'rgb(235, 225, 217)',
	surface: 'rgb(31, 27, 22)',
	onSurface: 'rgb(235, 225, 217)',
	surfaceVariant: 'rgb(80, 69, 57)',
	onSurfaceVariant: 'rgb(212, 196, 181)',
	outline: 'rgb(156, 142, 128)',
	outlineVariant: 'rgb(80, 69, 57)',
	shadow: 'rgb(0, 0, 0)',
	scrim: 'rgb(0, 0, 0)',
	inverseSurface: 'rgb(235, 225, 217)',
	inverseOnSurface: 'rgb(53, 47, 42)',
	inversePrimary: 'rgb(133, 84, 0)',
	elevation: {
		level0: 'transparent',
		level1: 'rgb(42, 35, 26)',
		level2: 'rgb(49, 40, 28)',
		level3: 'rgb(56, 44, 30)',
		level4: 'rgb(58, 46, 30)',
		level5: 'rgb(62, 49, 32)',
	},
	surfaceDisabled: 'rgba(235, 225, 217, 0.12)',
	onSurfaceDisabled: 'rgba(235, 225, 217, 0.38)',
	backdrop: 'rgba(56, 47, 36, 0.4)',
};

const Orange: ThemeDefinition = {
	fonts: DefaultFonts,
	light: LightOrange,
	dark: DarkOrange,
}

export default Orange;