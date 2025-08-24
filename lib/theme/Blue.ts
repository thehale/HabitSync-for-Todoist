// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// This theme comes from the React Native Paper demonstration app. Used under the terms of the MIT license.
// Source: https://github.com/callstack/react-native-paper/blob/ac3820a50fe1afb82c19cc0853a451e5c190b769/example/utils/index.ts

import type { ThemeColors, ThemeDefinition } from "./types";

import DefaultFonts from "./DefaultFonts";

const LightBlue: ThemeColors = {
	primary: 'rgb(52, 61, 255)',
	onPrimary: 'rgb(255, 255, 255)',
	primaryContainer: 'rgb(224, 224, 255)',
	onPrimaryContainer: 'rgb(0, 0, 110)',
	secondary: 'rgb(92, 93, 114)',
	onSecondary: 'rgb(255, 255, 255)',
	secondaryContainer: 'rgb(225, 224, 249)',
	onSecondaryContainer: 'rgb(25, 26, 44)',
	tertiary: 'rgb(120, 83, 107)',
	onTertiary: 'rgb(255, 255, 255)',
	tertiaryContainer: 'rgb(255, 216, 238)',
	onTertiaryContainer: 'rgb(46, 17, 38)',
	error: 'rgb(186, 26, 26)',
	onError: 'rgb(255, 255, 255)',
	errorContainer: 'rgb(255, 218, 214)',
	onErrorContainer: 'rgb(65, 0, 2)',
	background: 'rgb(255, 251, 255)',
	onBackground: 'rgb(27, 27, 31)',
	surface: 'rgb(255, 251, 255)',
	onSurface: 'rgb(27, 27, 31)',
	surfaceVariant: 'rgb(228, 225, 236)',
	onSurfaceVariant: 'rgb(70, 70, 79)',
	outline: 'rgb(119, 118, 128)',
	outlineVariant: 'rgb(199, 197, 208)',
	shadow: 'rgb(0, 0, 0)',
	scrim: 'rgb(0, 0, 0)',
	inverseSurface: 'rgb(48, 48, 52)',
	inverseOnSurface: 'rgb(243, 239, 244)',
	inversePrimary: 'rgb(190, 194, 255)',
	elevation: {
		level0: 'transparent',
		level1: 'rgb(245, 242, 255)',
		level2: 'rgb(239, 236, 255)',
		level3: 'rgb(233, 230, 255)',
		level4: 'rgb(231, 228, 255)',
		level5: 'rgb(227, 224, 255)',
	},
	surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
	onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
	backdrop: 'rgba(48, 48, 56, 0.4)',
}

const DarkBlue: ThemeColors = {
	primary: 'rgb(190, 194, 255)',
	onPrimary: 'rgb(0, 1, 172)',
	primaryContainer: 'rgb(0, 0, 239)',
	onPrimaryContainer: 'rgb(224, 224, 255)',
	secondary: 'rgb(197, 196, 221)',
	onSecondary: 'rgb(46, 47, 66)',
	secondaryContainer: 'rgb(68, 69, 89)',
	onSecondaryContainer: 'rgb(225, 224, 249)',
	tertiary: 'rgb(232, 185, 213)',
	onTertiary: 'rgb(70, 38, 59)',
	tertiaryContainer: 'rgb(94, 60, 82)',
	onTertiaryContainer: 'rgb(255, 216, 238)',
	error: 'rgb(255, 180, 171)',
	onError: 'rgb(105, 0, 5)',
	errorContainer: 'rgb(147, 0, 10)',
	onErrorContainer: 'rgb(255, 180, 171)',
	background: 'rgb(27, 27, 31)',
	onBackground: 'rgb(229, 225, 230)',
	surface: 'rgb(27, 27, 31)',
	onSurface: 'rgb(229, 225, 230)',
	surfaceVariant: 'rgb(70, 70, 79)',
	onSurfaceVariant: 'rgb(199, 197, 208)',
	outline: 'rgb(145, 144, 154)',
	outlineVariant: 'rgb(70, 70, 79)',
	shadow: 'rgb(0, 0, 0)',
	scrim: 'rgb(0, 0, 0)',
	inverseSurface: 'rgb(229, 225, 230)',
	inverseOnSurface: 'rgb(48, 48, 52)',
	inversePrimary: 'rgb(52, 61, 255)',
	elevation: {
		level0: 'transparent',
		level1: 'rgb(35, 35, 42)',
		level2: 'rgb(40, 40, 49)',
		level3: 'rgb(45, 45, 56)',
		level4: 'rgb(47, 47, 58)',
		level5: 'rgb(50, 50, 62)',
	},
	surfaceDisabled: 'rgba(229, 225, 230, 0.12)',
	onSurfaceDisabled: 'rgba(229, 225, 230, 0.38)',
	backdrop: 'rgba(48, 48, 56, 0.4)',
}

const Blue: ThemeDefinition = {
	fonts: DefaultFonts,
	light: LightBlue,
	dark: DarkBlue,
};

export default Blue;