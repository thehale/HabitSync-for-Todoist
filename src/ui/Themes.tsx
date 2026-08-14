// Copyright (c) 2026 Joseph Hale
// 
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from "react-native";
import { useCallback, useState } from "react";
import { LegendList } from "@legendapp/list/react-native";
import {
  Button, Dialog, Divider, Segment, Segmented, Text,
  s, useMaterialTheme,
  type ColorScheme, type MaterialThemeDefinition,
} from "react-native-expressive";
import { useAsyncState } from "../lib/hooks/useAsyncState";
import { restorePurchases } from "../lib/purchases/revenuecat";
import { PRODUCTS } from "../lib/purchases/products";
import type { ThemeProduct } from "../lib/purchases/ThemeProduct";

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
  const { scheme, setScheme } = useMaterialTheme();
  return (
    <Dialog visible={visible} onDismiss={onDismiss}
      content={
        <View style={styles.content}>
          <Segmented
            value={scheme}
            onChange={(value) => setScheme(value as ColorScheme)}
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
  const renderItem = useCallback(({ item }: { item: ThemeProduct }) => <ThemeRow item={item} />, []);
  const keyExtractor = useCallback((item: ThemeProduct) => item.themeDefinition.name, []);
  return (
    <LegendList
      data={PRODUCTS}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={separator}
      estimatedItemSize={48}
    />
  )
}

function ThemeRow({ item }: { item: ThemeProduct }) {
  return (
    <View style={styles.row}>
      <View style={styles.labelRow}>
        <View style={[styles.dot, { backgroundColor: item.themeDefinition.light.primary }]} />
        <Text>{themeLabel(item.themeDefinition)}</Text>
      </View>
      <ThemeButton item={item} />
    </View>
  );
}

function ThemeButton({ item }: { item: ThemeProduct }) {
  const { theme, setThemeDefinition } = useMaterialTheme();
  const isCurrentTheme = theme.name === item.themeDefinition.name;
  
  const entitled = useAsyncState(false, async () => item.isEntitled(), [item.themeDefinition.name]);
  const price = useAsyncState<string | null>(null, async () => item.price(), [item.themeDefinition.name]);
  
  const selectTheme = useCallback(() => {
    setThemeDefinition(item.themeDefinition);
  }, [item.themeDefinition, setThemeDefinition]);
  const purchase = useCallback(async () => {
    await item.purchase();
    setThemeDefinition(item.themeDefinition);
  }, [item.themeDefinition.name, setThemeDefinition]);

  return (
    <Button
      mode={"text"}
      disabled={isCurrentTheme || (!entitled && !price)}
      onPress={entitled ? selectTheme : purchase}
    >
      {
        isCurrentTheme ? "Active" : 
        entitled ? "Select" : 
        price ?? "..."
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
