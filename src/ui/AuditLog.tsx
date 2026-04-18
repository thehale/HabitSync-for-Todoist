import React from 'react';
import { Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-expressive';
import { StructuredLog } from '../lib/lenador';
import { humanSummary } from '../lib/history';

interface AuditLogProps {
  logs: StructuredLog[];
}
export default function AuditLog({ logs }: AuditLogProps) {
  if (logs.length === 0) {
    return <Text>Nothing yet!</Text>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Pressable>
        {logs.reverse().map((log, index) => (
          <View key={index} style={styles.item}>
            <LogEntry log={log} />
            {(index < logs.length - 1) && <Divider />}
          </View>
        ))}
      </Pressable>
    </ScrollView>
  );
}

function LogEntry({ log }: { log: StructuredLog }) {
  return (
    <View style={styles.entry}>
      <Text>{humanSummary(log)}</Text>
      <Button onPress={() => share(log)}>Share</Button>
    </View>
  )
}

function share(log: StructuredLog) {
  Share.share({
    title: 'Habit Sync Log Entry',
    message: JSON.stringify(log, null, 2),
  })
}

const styles = StyleSheet.create({
  container: { height: 300 },
  contentContainer: {
    gap: 12,
    paddingVertical: 4,
  },
  item: { gap: 4, paddingBottom: 4 },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
