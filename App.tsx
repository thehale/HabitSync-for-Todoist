import { StyleSheet, View } from 'react-native';

import { Divider, useMaterialTheme } from 'react-native-expressive';
import HabitList from './src/ui/HabitList';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Actions from './src/ui/Actions';

export default function App() {
  const { theme } = useMaterialTheme();
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