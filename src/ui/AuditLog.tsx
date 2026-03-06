import { FlatList, Share, StyleSheet, View } from 'react-native';
import { Button, Card, Text, useMaterialTheme } from 'react-native-expressive';

import React, { useCallback, useState } from 'react';
import { Storage } from '../lib/Storage';
import { SyncLogEntry } from '../types';

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleString();
}

function formatEntryForShare(entry: SyncLogEntry): string {
  const lines: string[] = [
    'HabitSync Audit Log Entry',
    `Sync at: ${formatDate(entry.timestamp)}`,
    '',
  ];
  if (!entry.success) {
    lines.push('Error', entry.error ?? '(no details)');
  } else {
    lines.push('Tasks Synced:');
    if (entry.habitUpdates.length === 0) {
      lines.push('  (none)');
    } else {
      entry.habitUpdates.forEach(u =>
        lines.push(`  \u2022 ${u.taskTitle} \u2192 ${u.habitName}`),
      );
    }
    if (entry.habitErrors && entry.habitErrors.length > 0) {
      lines.push('', 'Habit Errors:');
      entry.habitErrors.forEach(e =>
        lines.push(`  \u2022 ${e.taskTitle} \u2192 ${e.habitName}: ${e.error}`),
      );
    }
  }
  return lines.join('\n');
}

interface SyncCardContentProps {
  entry: SyncLogEntry;
}
function SyncCardContent({ entry }: SyncCardContentProps) {
  const { theme } = useMaterialTheme();
  if (!entry.success) {
    return (
      <View style={styles.section}>
        <Text variant="label" style={{ color: theme.colors.error }}>Error</Text>
        <Text>{entry.error}</Text>
      </View>
    );
  }
  return (
    <View>
      <View style={styles.section}>
        <Text variant="label">Tasks Synced</Text>
        {entry.habitUpdates.length === 0 ? (
          <Text style={styles.none}>(none)</Text>
        ) : (
          entry.habitUpdates.map(u => (
            <Text key={`${u.taskTitle}-${u.habitName}`} style={styles.bullet}>
              {`\u2022 ${u.taskTitle} \u2192 ${u.habitName}`}
            </Text>
          ))
        )}
      </View>
      {entry.habitErrors && entry.habitErrors.length > 0 && (
        <View style={styles.section}>
          <Text variant="label" style={{ color: theme.colors.error }}>Habit Errors</Text>
          {entry.habitErrors.map(e => (
            <Text key={`${e.taskTitle}-${e.habitName}`} style={styles.bullet}>
              {`\u2022 ${e.taskTitle} \u2192 ${e.habitName}: ${e.error}`}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

interface SyncLogCardProps {
  entry: SyncLogEntry;
}
function SyncLogCard({ entry }: SyncLogCardProps) {
  const exportEntry = async () => {
    await Share.share({ message: formatEntryForShare(entry) });
  };

  return (
    <Card
      title={formatDate(entry.timestamp)}
      content={<SyncCardContent entry={entry} />}
      actions={
        <Card.Actions>
          <Button mode="text" onPress={exportEntry}>
            Share
          </Button>
        </Card.Actions>
      }
    />
  );
}

interface AuditLogProps {
  onClose: () => void;
}
export default function AuditLog({ onClose }: AuditLogProps) {
  const { theme } = useMaterialTheme();
  const [logs, setLogs] = useState<SyncLogEntry[]>(() => Storage.SyncLogs.read());

  const refreshLogs = useCallback(() => setLogs(Storage.SyncLogs.read()), []);

  const exportAll = async () => {
    await Share.share({ message: JSON.stringify(logs, null, 2) });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}>
      <View style={styles.header}>
        <Text style={styles.title}>Sync History</Text>
        <View style={styles.headerActions}>
          <Button mode="text" onPress={refreshLogs}>Refresh</Button>
          {logs.length > 0 && (
            <Button mode="text" onPress={exportAll}>
              Share All
            </Button>
          )}
          <Button mode="text" onPress={onClose}>
            Close
          </Button>
        </View>
      </View>
      {logs.length === 0 ? (
        <View style={styles.empty}>
          <Text>No sync history yet. Run a sync to get started.</Text>
        </View>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={item => item.timestamp}
          renderItem={({ item }) => <SyncLogCard entry={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  listContent: { gap: 8, padding: 8 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: '10%' },
  section: { marginBottom: 4 },
  bullet: { marginLeft: 8 },
  none: { marginLeft: 8, fontStyle: 'italic' },
});
