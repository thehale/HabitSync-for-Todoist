// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from "react-native";
import { useCallback, useState } from "react";
import { LegendList } from "@legendapp/list/react-native";
import {
  Button, Dialog, Divider, Segment, Segmented, Text, s,
  type ColorScheme, type MaterialThemeDefinition, useMaterialTheme,
  MaterialBlue, MaterialCyan, MaterialGreen, MaterialOrange,
  MaterialPink, MaterialRed, MaterialYellow,
} from "react-native-expressive";
import { useThemeProduct } from "../lib/purchases/useThemeProduct";
import { restorePurchases } from "../lib/purchases/revenuecat";

const THEMES: MaterialThemeDefinition[] = [
  MaterialRed, MaterialOrange, MaterialYellow, MaterialGreen,
  MaterialBlue, MaterialCyan, MaterialPink,
];

export default function Themes() {
  const [showThemesDialog, setThemesDialogVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setThemesDialogVisible(true)}>Themes</Button>
      <ThemesDialog
        visible={showThemesDialog}
        onDismiss={() => setThemesDialogVisible(false)}
      />
    </>
  )
}

interface ThemesDialogProps {
  visible: boolean;
  onDismiss: () => void;
}
function ThemesDialog({ visible, onDismiss }: ThemesDialogProps) {
  const { scheme, setScheme } = useMaterialTheme()
  return (
    <Dialog visible={visible} onDismiss={onDismiss}
      content={
        <View style={styles.content}>
          <Segmented
            value={scheme}
            onChange={(value) => { console.log(Date.now(), "ThemesDialog onChange", value); setScheme(value as ColorScheme); }}
          >
            <Segment value="light">Light</Segment>
            <Segment value="system">System</Segment>
            <Segment value="dark">Dark</Segment>
          </Segmented>
          <ThemeList />
        </View>
      }
      actions={
        <Dialog.Actions>
          <Button onPress={restorePurchases}>Restore Purchases</Button>
          <Button mode="contained" onPress={onDismiss}>Close</Button>
        </Dialog.Actions>
      }
    />
  );
}

function ThemeList() {
  const separator = useCallback(() => <Divider />, []);
  const renderItem = useCallback(({ item }: { item: MaterialThemeDefinition }) => <ThemeRow item={item} />, []);
  const keyExtractor = useCallback((item: MaterialThemeDefinition) => item.name, []);
  return (
    <LegendList
      data={THEMES}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={separator}
      estimatedItemSize={48}
    />
  )
}

function ThemeRow({ item }: { item: MaterialThemeDefinition }) {
  return (
    <View style={styles.row}>
      <View style={styles.labelRow}>
        <View style={[styles.dot, { backgroundColor: item.light.primary }]} />
        <Text>{themeLabel(item)}</Text>
      </View>
      <ThemeButton item={item} />
    </View>
  );
}

function ThemeButton({ item }: { item: MaterialThemeDefinition }) {
  const { theme, setTheme } = useMaterialTheme();
  const isCurrentTheme = theme.name === item.name;
  const product = useThemeProduct(item);
  return (
    <Button
      mode={"text"}
      disabled={isCurrentTheme || (!product.entitled && !product.price)}
      onPress={product.entitled ? () => setTheme(item) : product.purchase}
    >
      {
        isCurrentTheme ? "Active" : 
        product.entitled ? "Select" : 
        product.price ?? "..."
      }
    </Button>
  )
}

function themeLabel(t: MaterialThemeDefinition): string {
  return t.name.replace("material/", "").replace(/^\w/, (c) => c.toUpperCase());
}

const styles = StyleSheet.create({
  content: {
    gap: s.space.default,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: s.space.half,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: s.space.default,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
