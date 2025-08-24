import { SafeAreaView, View } from 'react-native';

import Divider from '@components/Divider';
import HabitList from './src/ui/HabitList';
import ManualSync from './src/ui/ManualSync';
import React from 'react';
import { TokenManagement } from './src/ui/TokenManagement';
import { useTheme } from './lib/theme/useTheme';

export default function App() {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <HabitList />
      <View style={{ margin: 8 }}>
        <TokenManagement />
      </View>
      <Divider />
      <View style={{ margin: 8 }}>
        <ManualSync />
      </View>
    </SafeAreaView>
  );
}