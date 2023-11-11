import {Button, PaperProvider, Text} from 'react-native-paper';

import HabitList from './src/ui/HabitList';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { TokenManagement } from './src/ui/TokenManagement';
import { useStorage } from './src/ui/useStorage';

const runSync = require('./src/tasks/TodoistHabitSync');

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={{flex: 1}}>
        <Button onPress={runSync}>Manual Sync</Button>
        <TokenManagement />
        <HabitList />
      </SafeAreaView>
    </PaperProvider>
  );
}