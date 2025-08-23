// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// Adapted from React Native Paper. Used under the terms of the MIT license.
// https://github.com/callstack/react-native-paper/blob/ff0df5454eb13d6e8e2d8f1c87c0bca8bb3635f0/src/styles/themes/v3/tokens.tsx

import { Platform } from "react-native";
import type { ThemeFonts } from "./types";

const DefaultFontFamily = Platform.select({
	web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
	ios: 'System',
	default: 'sans-serif',
})

const DefaultFonts: ThemeFonts = {
	display: {
		small:  { fontSize: 36, lineHeight: 44, fontWeight: '400', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0 },
		medium: { fontSize: 45, lineHeight: 52, fontWeight: '400', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0 },
		large:  { fontSize: 57, lineHeight: 64, fontWeight: '400', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0 },
	},
	headline: {
		small:  { fontSize: 24, lineHeight: 32, fontWeight: '400', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0 },
		medium: { fontSize: 28, lineHeight: 36, fontWeight: '400', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0 },
		large:  { fontSize: 32, lineHeight: 40, fontWeight: '400', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0 },
	},
	title: {
		small:  { fontSize: 14, lineHeight: 20, fontWeight: '500', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0.1 },
		medium: { fontSize: 16, lineHeight: 24, fontWeight: '500', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0.15 },
		large:  { fontSize: 22, lineHeight: 28, fontWeight: '400', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0 },
	},
	label: {
		small:  { fontSize: 11, lineHeight: 16, fontWeight: '500', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0.5 },
		medium: { fontSize: 12, lineHeight: 16, fontWeight: '500', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0.5 },
		large:  { fontSize: 14, lineHeight: 20, fontWeight: '500', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0.1 },
	},
	body: {
		small:  { fontSize: 12, lineHeight: 16, fontWeight: '400', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0.4 },
		medium: { fontSize: 14, lineHeight: 20, fontWeight: '400', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0.25 },
		large:  { fontSize: 16, lineHeight: 24, fontWeight: '400', fontStyle: 'normal', fontFamily: DefaultFontFamily, letterSpacing: 0.15 },
	},
}

export default DefaultFonts;