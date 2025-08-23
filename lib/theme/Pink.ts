// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// This theme comes from the React Native Paper demonstration app. Used under the terms of the MIT license.
// Source: https://github.com/callstack/react-native-paper/blob/ac3820a50fe1afb82c19cc0853a451e5c190b769/example/utils/index.ts

import type { Theme, ThemeColors } from "./types";

import DefaultFonts from "./DefaultFonts";

const LightPink: ThemeColors = {
	primary: 'rgb(154, 64, 87)',
	onPrimary: 'rgb(255, 255, 255)',
	primaryContainer: 'rgb(255, 217, 223)',
	onPrimaryContainer: 'rgb(63, 0, 22)',
	secondary: 'rgb(117, 86, 92)',
	onSecondary: 'rgb(255, 255, 255)',
	secondaryContainer: 'rgb(255, 217, 223)',
	onSecondaryContainer: 'rgb(43, 21, 26)',
	tertiary: 'rgb(122, 87, 50)',
	onTertiary: 'rgb(255, 255, 255)',
	tertiaryContainer: 'rgb(255, 220, 188)',
	onTertiaryContainer: 'rgb(44, 23, 0)',
	error: 'rgb(186, 26, 26)',
	onError: 'rgb(255, 255, 255)',
	errorContainer: 'rgb(255, 218, 214)',
	onErrorContainer: 'rgb(65, 0, 2)',
	background: 'rgb(255, 251, 255)',
	onBackground: 'rgb(32, 26, 27)',
	surface: 'rgb(255, 251, 255)',
	onSurface: 'rgb(32, 26, 27)',
	surfaceVariant: 'rgb(243, 221, 224)',
	onSurfaceVariant: 'rgb(82, 67, 69)',
	outline: 'rgb(132, 115, 117)',
	outlineVariant: 'rgb(214, 194, 196)',
	shadow: 'rgb(0, 0, 0)',
	scrim: 'rgb(0, 0, 0)',
	inverseSurface: 'rgb(54, 47, 48)',
	inverseOnSurface: 'rgb(250, 238, 238)',
	inversePrimary: 'rgb(255, 177, 192)',
	elevation: {
		level0: 'transparent',
		level1: 'rgb(250, 242, 247)',
		level2: 'rgb(247, 236, 242)',
		level3: 'rgb(244, 230, 237)',
		level4: 'rgb(243, 229, 235)',
		level5: 'rgb(241, 225, 232)',
	},
	surfaceDisabled: 'rgba(32, 26, 27, 0.12)',
	onSurfaceDisabled: 'rgba(32, 26, 27, 0.38)',
	backdrop: 'rgba(58, 45, 47, 0.4)',
}


const DarkPink: ThemeColors = {
	primary: 'rgb(255, 177, 192)',
	onPrimary: 'rgb(95, 17, 42)',
	primaryContainer: 'rgb(124, 41, 64)',
	onPrimaryContainer: 'rgb(255, 217, 223)',
	secondary: 'rgb(228, 189, 195)',
	onSecondary: 'rgb(67, 41, 46)',
	secondaryContainer: 'rgb(92, 63, 68)',
	onSecondaryContainer: 'rgb(255, 217, 223)',
	tertiary: 'rgb(236, 190, 144)',
	onTertiary: 'rgb(70, 42, 8)',
	tertiaryContainer: 'rgb(95, 64, 29)',
	onTertiaryContainer: 'rgb(255, 220, 188)',
	error: 'rgb(255, 180, 171)',
	onError: 'rgb(105, 0, 5)',
	errorContainer: 'rgb(147, 0, 10)',
	onErrorContainer: 'rgb(255, 180, 171)',
	background: 'rgb(32, 26, 27)',
	onBackground: 'rgb(236, 224, 224)',
	surface: 'rgb(32, 26, 27)',
	onSurface: 'rgb(236, 224, 224)',
	surfaceVariant: 'rgb(82, 67, 69)',
	onSurfaceVariant: 'rgb(214, 194, 196)',
	outline: 'rgb(159, 140, 143)',
	outlineVariant: 'rgb(82, 67, 69)',
	shadow: 'rgb(0, 0, 0)',
	scrim: 'rgb(0, 0, 0)',
	inverseSurface: 'rgb(236, 224, 224)',
	inverseOnSurface: 'rgb(54, 47, 48)',
	inversePrimary: 'rgb(154, 64, 87)',
	elevation: {
		level0: 'transparent',
		level1: 'rgb(43, 34, 35)',
		level2: 'rgb(50, 38, 40)',
		level3: 'rgb(57, 43, 45)',
		level4: 'rgb(59, 44, 47)',
		level5: 'rgb(63, 47, 50)',
	},
	surfaceDisabled: 'rgba(236, 224, 224, 0.12)',
	onSurfaceDisabled: 'rgba(236, 224, 224, 0.38)',
	backdrop: 'rgba(58, 45, 47, 0.4)',
}

const Pink: Theme = {
	fonts: DefaultFonts,
	light: LightPink,
	dark: DarkPink,
};

export default Pink;