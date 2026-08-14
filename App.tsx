// Copyright (c) 2026 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { StyleSheet, View } from 'react-native';

import { Divider, useMaterialTheme } from 'react-native-expressive';
import HabitList from './src/ui/HabitList';
import React, { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Actions from './src/ui/Actions';
import { init } from './src/init';

export default function App() {
  const { theme } = useMaterialTheme();
  useEffect(() => { init() }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <HabitList />
        <Divider />
        <View style={styles.spacing}>
          <Actions />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  spacing: { margin: 8 },
});