// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Text as NativeText, StyleSheet } from "react-native";

type TextVariant = keyof typeof typography;
type TextSize = keyof typeof typography[TextVariant];

export interface TextProps {
  variant?: TextVariant | `${TextVariant} ${TextSize}`;
  children: string | React.ReactNode;
}

export default function Text(props: TextProps) {
  const [variant, size] = (props.variant ?? "body").split(" ") as [TextVariant, TextSize | undefined];
  return <NativeText style={[typography[variant][size ?? "medium"], colors.text]}>{props.children}</NativeText>;
}

const colors = StyleSheet.create({
  text: { color: "white" }
});

// Font weights taken from React Native Paper: https://github.com/callstack/react-native-paper/blob/ff0df5454eb13d6e8e2d8f1c87c0bca8bb3635f0/docs/docs/guides/04-fonts.md#display
const typography = {
  display: StyleSheet.create({
    small: { fontSize: 36, lineHeight: 44, fontWeight: '400', letterSpacing: 0 },
    medium: { fontSize: 45, lineHeight: 52, fontWeight: '400', letterSpacing: 0 },
    large: { fontSize: 57, lineHeight: 64, fontWeight: '400', letterSpacing: 0 },
  }),
  headline: StyleSheet.create({
    small: { fontSize: 24, lineHeight: 32, fontWeight: '400', letterSpacing: 0 },
    medium: { fontSize: 28, lineHeight: 36, fontWeight: '400', letterSpacing: 0 },
    large: { fontSize: 32, lineHeight: 40, fontWeight: '400', letterSpacing: 0 },
  }),
  title: StyleSheet.create({
    small: { fontSize: 14, lineHeight: 20, fontWeight: '500', letterSpacing: 0.1 },
    medium: { fontSize: 16, lineHeight: 24, fontWeight: '500', letterSpacing: 0.15 },
    large: { fontSize: 22, lineHeight: 28, fontWeight: '400', letterSpacing: 0 },
  }),
  label: StyleSheet.create({
    small: { fontSize: 11, lineHeight: 16, fontWeight: '500', letterSpacing: 0.5 },
    medium: { fontSize: 12, lineHeight: 16, fontWeight: '500', letterSpacing: 0.5 },
    large: { fontSize: 14, lineHeight: 20, fontWeight: '500', letterSpacing: 0.1 },
  }),
  body: StyleSheet.create({
    small: { fontSize: 12, lineHeight: 16, fontWeight: '400', letterSpacing: 0.4 },
    medium: { fontSize: 14, lineHeight: 20, fontWeight: '400', letterSpacing: 0.25 },
    large: { fontSize: 16, lineHeight: 24, fontWeight: '400', letterSpacing: 0.15 },
  }),
}
