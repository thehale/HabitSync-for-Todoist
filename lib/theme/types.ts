// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// Modified from React Native Paper. Used under the terms of the MIT license.
// https://github.com/callstack/react-native-paper/blob/ff0df5454eb13d6e8e2d8f1c87c0bca8bb3635f0/src/types.tsx#

export type Theme = {
  fonts: ThemeFonts;
  dark: ThemeColors;
  light: ThemeColors;
};

export type ThemeColors = {
  primary: string;
  primaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
  surface: string;
  surfaceVariant: string;
  surfaceDisabled: string;
  background: string;
  error: string;
  errorContainer: string;
  onPrimary: string;
  onPrimaryContainer: string;
  onSecondary: string;
  onSecondaryContainer: string;
  onTertiary: string;
  onTertiaryContainer: string;
  onSurface: string;
  onSurfaceVariant: string;
  onSurfaceDisabled: string;
  onError: string;
  onErrorContainer: string;
  onBackground: string;
  outline: string;
  outlineVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  shadow: string;
  scrim: string;
  backdrop: string;
  elevation: {
    level0: string;
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
  };
};

export type ThemeFonts = {
  display: ThemeFont;
  headline: ThemeFont;
  title: ThemeFont;
  label: ThemeFont;
  body: ThemeFont;
};


////////////////////////////////////////////////////////////
// Private types below here.

type ThemeFont = {
  small: Font;
  medium: Font;
  large: Font;
}

type Font = {
  fontFamily: string;
  fontWeight:
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
  fontStyle: 'normal' | 'italic';
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
};