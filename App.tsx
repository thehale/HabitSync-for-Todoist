import HabitList from './src/ui/HabitList'
import { PaperProvider } from 'react-native-paper'
import React from 'react'

export default function App() {
  return (
    <PaperProvider>
      <HabitList />
    </PaperProvider>
  )
}