// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Button as NativeButton, StyleSheet, View } from "react-native";

export interface ButtonProps {
	children: string;
	onPress: () => void;
}

export default function Button(props: ButtonProps) {
	return (
		<View style={styles.container}>
			<NativeButton title={props.children} onPress={props.onPress}></NativeButton>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { margin: 2 }
});