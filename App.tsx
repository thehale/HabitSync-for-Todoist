import { StyleSheet, View } from 'react-native';

import { Divider, useMaterialTheme } from 'react-native-expressive';
import AuditLog from './src/ui/AuditLog';
import HabitList from './src/ui/HabitList';
import ManualSync from './src/ui/ManualSync';
import React, { useState } from 'react';
import { TokenManagement } from './src/ui/TokenManagement';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const { theme } = useMaterialTheme();
  const [showAuditLog, setShowAuditLog] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {showAuditLog ? (
          <AuditLog onClose={() => setShowAuditLog(false)} />
        ) : (
          <>
            <HabitList />
            <View style={styles.spacing}>
              <TokenManagement />
            </View>
            <Divider />
            <View style={styles.spacing}>
              <ManualSync onViewHistory={() => setShowAuditLog(true)} />
            </View>
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  spacing: { margin: 8 },
});