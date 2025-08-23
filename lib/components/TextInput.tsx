// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { TextInput as NativeTextInput, StyleSheet, View } from "react-native";

interface TextInputProps {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	before?: React.ReactNode;
	after?: React.ReactNode;
}


export default function TextInput(props: TextInputProps) {
	return (
		<View style={styles.container}>
			{props.before}
			<NativeTextInput
				style={styles.input}
				placeholder={props.placeholder}
				value={props.value}
				onChangeText={props.onChangeText}
				autoCapitalize='none'
				autoCorrect={false}
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
		gap: 8,
	},
	input: {
		backgroundColor: "#f0f0f0",
		flex: 1,
	},
});