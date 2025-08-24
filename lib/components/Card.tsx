// Copyright (c) 2025 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Text, { TextProps } from "@components/Text";

import React from "react";
import { useTheme } from "../theme/useTheme";

export interface CardProps {
	title?: string | React.ReactNode;
	subtitle?: string | React.ReactNode;
	content?: string | React.ReactNode;
	actions?: React.ReactNode;
}

export default function Card(props: CardProps) {
	const { theme } = useTheme();
	const colors: ViewStyle = {
		backgroundColor: theme.colors.surface,
		borderColor: theme.colors.outlineVariant,
		borderWidth: 1,
		elevation: 5,
	}
	return (
		<View style={[styles.container, colors]}>
			<Title>{props.title}</Title>
			<Subtitle>{props.subtitle}</Subtitle>
			<Content>{props.content}</Content>
			{props.actions instanceof Actions ? props.actions : <Actions>{props.actions}</Actions>}
		</View>
	);
}

function Title(props: { children: string | React.ReactNode }) {
	return <_Section containerStyle={styles.title} textVariant="title">{props.children}</_Section>;
}

function Subtitle(props: { children: string | React.ReactNode }) {
	return <_Section containerStyle={styles.subtitle} textVariant="title small">{props.children}</_Section>;
}

function Content(props: { children: string | React.ReactNode }) {
	return <_Section containerStyle={styles.content}>{props.children}</_Section>;
}

function Actions(props: { children: React.ReactNode }) {
	return <_Section containerStyle={styles.actions} textVariant="label">{props.children}</_Section>;
}

Card.Actions = Actions;

function _Section(props: { children: string | React.ReactNode, containerStyle?: StyleProp<ViewStyle>, textVariant?: TextProps['variant'] }) {
	if (!props.children) return null;
	else {
		const children = Array.isArray(props.children) ? props.children : [props.children];
		const inners = children.filter(i => !!i).map((child, index) =>
			typeof child === 'string' ? <Text key={index} variant={props.textVariant}>{child}</Text> : <View key={index}>{child}</View>
		);
		return <View style={props.containerStyle}>{inners}</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		padding: 16,
		borderRadius: 8,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	title: { marginBottom: 8 },
	subtitle: { marginBottom: 8 },
	content: { marginBottom: 8 },
	actions: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 8
	}
});