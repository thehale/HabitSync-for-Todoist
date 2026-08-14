// Copyright (c) 2026 Joseph Hale
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import React, { useCallback, useMemo } from 'react';
import { Share, StyleSheet, View } from 'react-native';
import { LegendList } from '@legendapp/list/react-native';
import { Button, s, Text } from 'react-native-expressive';
import { StructuredLog } from '../lib/lenador';
import { humanSummary } from '../lib/history';

interface AuditLogProps {
  logs: StructuredLog[];
}
export default function AuditLog({ logs }: AuditLogProps) {
  if (logs.length === 0) {
    return <Text>Nothing yet!</Text>;
  }

  const reversedLogs = useMemo(() => [...logs].reverse(), [logs]);
  const keyExtractor = useCallback((_: StructuredLog, index: number) => `${index}`, []);
  const renderItem = useCallback(({ item }: { item: StructuredLog; }) => (
    <View style={styles.item}>
      <LogEntry log={item} />
    </View>
  ), [reversedLogs.length]);

  return (
    <LegendList
      style={styles.container}
      data={reversedLogs}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainer}
    />
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
    gap: s.space.default,
    paddingVertical: s.space.half,
  },
  item: { gap: s.space.half, paddingBottom: s.space.half },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
