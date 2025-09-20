import { StyleSheet, View } from 'react-native';

import Divider from '@components/Divider';
import HabitList from './src/ui/HabitList';
import ManualSync from './src/ui/ManualSync';
import React from 'react';
import { TokenManagement } from './src/ui/TokenManagement';
import { useTheme } from './lib/theme/useTheme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const { theme } = useTheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <HabitList />
        <View style={styles.spacing}>
          <TokenManagement />
        </View>
        <Divider />
        <View style={styles.spacing}>
          <ManualSync />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  spacing: { margin: 8 },
});