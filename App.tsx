import {Divider, PaperProvider} from 'react-native-paper';

import HabitList from './src/ui/HabitList';
import ManualSync from './src/ui/ManualSync';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { TokenManagement } from './src/ui/TokenManagement';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={{flex: 1}}>
        <HabitList />
        <TokenManagement />
        <Divider />
        <ManualSync />
      </SafeAreaView>
    </PaperProvider>
  );
}