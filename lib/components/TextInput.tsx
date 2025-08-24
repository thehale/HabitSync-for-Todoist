// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { TextInput as NativeTextInput, StyleSheet, View } from "react-native";

import { useTheme } from "../theme/useTheme";

interface TextInputProps {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	before?: React.ReactNode;
	after?: React.ReactNode;
}


export default function TextInput(props: TextInputProps) {
	const { theme } = useTheme();
	return (
		<View style={[styles.container, { backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary }]}>
			{props.before}
			<NativeTextInput
				style={[styles.input, { color: theme.colors.onSecondaryContainer }]}
				placeholder={props.placeholder}
				placeholderTextColor={theme.colors.backdrop}
				value={props.value}
				onChangeText={props.onChangeText}
				autoCapitalize='none'
				autoCorrect={false}
				underlineColorAndroid={'transparent'}
			/>
			{props.after}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 8,
		gap: 8,
		paddingHorizontal: 8,
		borderBottomWidth: 1,
	},
	input: {
		borderRadius: 8,
		flex: 1,
	},
});