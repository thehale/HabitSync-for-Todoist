// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/*
 * KNOWN BUGS:
 *   `mode="elevated" disabled`: The text is highlighted lighter than the rest of the button
 */

import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

import { Optional } from "../utils/typing";
import Text from "./Text";
import { Theme } from "../theme/types";
import { useTheme } from "../theme/useTheme";

type ButtonMode = "text" | "contained" | "outlined" | "tonal" | "elevated";
type ButtonIntent = "normal" | "danger";

export interface ButtonProps {
	children: string;
	mode: ButtonMode;
	intent: ButtonIntent;
	disabled: boolean;
	onPress: () => void;
	before?: React.ReactNode;
	after?: React.ReactNode;
}

type PropsWithDefaults = "mode" | "intent" | "disabled"

const propDefaults: Pick<ButtonProps, PropsWithDefaults> = {
	mode: "text",
	intent: "normal",
	disabled: false,
};

export default function Button(args: Optional<ButtonProps, PropsWithDefaults>) {
	const { theme } = useTheme();
	const props: ButtonProps = { ...propDefaults, ...args };
	const modeColors = buttonModeColors(theme)[props.mode];
	const dangerColors = buttonDangerColors(theme)[props.mode];
	const disabledColors = buttonDisabledColors(theme)[props.mode];
	return (
		<Pressable onPress={props.onPress} disabled={props.disabled}
			style={[
				styles.container,
				modeColors,
				props.intent === "danger" && dangerColors,
				props.disabled && disabledColors,
			]}>
			<View style={styles.contents}>
				{props.before}
				<Text
					style={[
						{ color: modeColors.textColor },
						props.intent === "danger" && { color: dangerColors.textColor },
						props.disabled && { color: disabledColors.textColor },
					]}>
					{props.children}
				</Text>
				{props.after}
			</View>
		</Pressable>
	);
}

interface ButtonColors extends ViewStyle {
	backgroundColor: string;
	textColor: string;
	borderColor: string;
	borderWidth: number;
}

function buttonModeColors(theme: Theme): Record<ButtonMode, ButtonColors> {
	return {
		text: {
			backgroundColor: "transparent",
			textColor: theme.colors.primary,
			borderColor: "transparent",
			borderWidth: 0,
		},
		contained: {
			backgroundColor: theme.colors.primary,
			textColor: theme.colors.onPrimary,
			borderColor: "transparent",
			borderWidth: 0,
		},
		outlined: {
			backgroundColor: "transparent",
			textColor: theme.colors.primary,
			borderColor: theme.colors.outline,
			borderWidth: 1,
		},
		tonal: {
			backgroundColor: theme.colors.secondaryContainer,
			textColor: theme.colors.onSecondaryContainer,
			borderColor: "transparent",
			borderWidth: 0,
		},
		elevated: {
			backgroundColor: theme.colors.elevation.level2,
			textColor: theme.colors.primary,
			borderColor: "transparent",
			borderWidth: 0,
			elevation: 2,
		}
	}
}

function buttonDangerColors(theme: Theme): Record<ButtonMode, ButtonColors> {
	return {
		text: {
			backgroundColor: "transparent",
			textColor: theme.colors.error,
			borderColor: "transparent",
			borderWidth: 0,
		},
		contained: {
			backgroundColor: theme.colors.error,
			textColor: theme.colors.onError,
			borderColor: "transparent",
			borderWidth: 0,
		},
		outlined: {
			backgroundColor: "transparent",
			textColor: theme.colors.error,
			borderColor: theme.colors.error,
			borderWidth: 1,
		},
		tonal: {
			backgroundColor: theme.colors.errorContainer,
			textColor: theme.colors.onErrorContainer,
			borderColor: "transparent",
			borderWidth: 0,
		},
		elevated: {
			backgroundColor: theme.colors.errorContainer,
			textColor: theme.colors.onErrorContainer,
			borderColor: "transparent",
			borderWidth: 0,
			elevation: 2,
		}
	}
}

function buttonDisabledColors(theme: Theme): Record<ButtonMode, ButtonColors> {
	return {
		text: {
			backgroundColor: "transparent",
			textColor: theme.colors.onSurfaceDisabled,
			borderColor: "transparent",
			borderWidth: 0,
		},
		contained: {
			backgroundColor: theme.colors.surfaceDisabled,
			textColor: theme.colors.onSurfaceDisabled,
			borderColor: "transparent",
			borderWidth: 0,
		},
		outlined: {
			backgroundColor: "transparent",
			textColor: theme.colors.onSurfaceDisabled,
			borderColor: theme.colors.surfaceDisabled,
			borderWidth: 1,
		},
		tonal: {
			backgroundColor: theme.colors.surfaceDisabled,
			textColor: theme.colors.onSurfaceDisabled,
			borderColor: "transparent",
			borderWidth: 0,
		},
		elevated: {
			backgroundColor: theme.colors.surfaceDisabled,
			textColor: theme.colors.onSurfaceDisabled,
			borderColor: "transparent",
			borderWidth: 0,
		},
	}
}

const styles = StyleSheet.create({
	container: { margin: 2, padding: 8, borderRadius: 8 },
	contents: { flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", gap: 8 },
});