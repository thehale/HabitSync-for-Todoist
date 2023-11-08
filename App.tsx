import HabitList from './src/ui/HabitList';
import {PaperProvider} from 'react-native-paper';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { TokenManagement } from './src/ui/TokenManagement';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={{flex: 1}}>
        <TokenManagement />
        <HabitList />
      </SafeAreaView>
    </PaperProvider>
  );
}