import Divider from '@components/Divider';
import HabitList from './src/ui/HabitList';
import ManualSync from './src/ui/ManualSync';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { TokenManagement } from './src/ui/TokenManagement';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HabitList />
      <TokenManagement />
      <Divider />
      <ManualSync />
    </SafeAreaView>
  );
}