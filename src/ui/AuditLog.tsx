import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-expressive';
import { StructuredLog } from '../lib/lenador';
import { humanSummary } from '../lib/history';

interface AuditLogProps {
  logs: StructuredLog[];
}
export default function AuditLog({ logs }: AuditLogProps) {
  const entries = [...logs].reverse().map(log => humanSummary(log));
  
  if (entries.length === 0) {
    return <Text>Nothing yet!</Text>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {entries.map((entry, index) => (
        <View key={index} style={{ gap: 12 }}>
          <Text>{entry}</Text>
          {(index < entries.length - 1) && <Divider />}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { height: 300 },
  contentContainer: {
    gap: 12,
    paddingVertical: 4,
  },
});
