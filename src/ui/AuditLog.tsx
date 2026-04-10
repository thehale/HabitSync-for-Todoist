import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
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
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={entries}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item }) => (
        <Pressable>
          <Text>{item}</Text>
        </Pressable>
      )}
      ItemSeparatorComponent={() => (
        <View style={styles.separator}>
          <Divider />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { height: 300 },
  contentContainer: {
    paddingVertical: 4,
  },
  separator: {
    marginVertical: 12,
  },
});
