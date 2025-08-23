// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import Card, { CardProps } from "./Card";
import { Modal, Pressable, StyleSheet, View } from "react-native";

export interface DialogProps extends CardProps {
	visible: boolean;
	onDismiss: () => void;
}

export default function Dialog(props: DialogProps) {
	return (
		<Modal
			visible={props.visible}
			animationType="fade"
			transparent={true}
			onRequestClose={props.onDismiss}
		>
			<Pressable style={[styles.centered, styles.background]} onPress={props.onDismiss}>
				<View style={[styles.centered, styles.container]}>
					<Card {...props} />
				</View>
			</Pressable>
		</Modal>
	);
}

Dialog.Actions = Card.Actions;

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	background: {
		backgroundColor: "rgba(0, 0, 0, 0.25)",
	},
	container: {
		width: "80%",
		height: "auto",
	}
});