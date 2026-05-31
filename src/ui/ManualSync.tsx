import React, { useState } from 'react';

import { Button, Dialog, Text } from 'react-native-expressive';
import { Linking, StyleSheet, View } from 'react-native';

const runSync = require('../tasks/TodoistHabitSync');

interface ManualSyncProps {
  onDisable: () => void;
}
export default function ManualSync({ onDisable }: ManualSyncProps) {
  const [showDialog, setDialogVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Button mode="tonal" onPress={() => setDialogVisible(true)}>Sync</Button>
      <SyncDialog
        visible={showDialog}
        onDisable={onDisable}
        onDismiss={() => setDialogVisible(false)}
      />
    </View>
  );
}

interface SyncDialogProps {
  visible: boolean;
  onDisable: () => void;
  onDismiss: () => void;
}
function SyncDialog({ visible, onDisable, onDismiss }: SyncDialogProps) {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}
      title="What is a habit sync?"
      content={
        <>
          <Text>
            Every 15 minutes, this app will automatically check Todoist for the
            day's completed recurring tasks and update your linked habits in Loop
            Habit Tracker.
            {'\n\n'}
            If the sync isn't working, check this app's battery settings to make
            sure it can run in the background without restrictions.
            {'\n'}
          </Text>
          <Button mode="tonal" onPress={() => Linking.sendIntent("android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS")}>Battery Settings</Button>
          <Text>
            {'\n'}
            Syncs can be disabled by clearing the API token. You'll have to re-add your token to enable syncs again.
            {'\n'}
          </Text>
          <Button mode="contained" intent="danger" onPress={() => { onDisable(); onDismiss(); }}>Disable Sync</Button>
          <Text>
            {'\n'}
            You can also run a sync on demand.
            {'\n'}
          </Text>
          <Button mode="contained" onPress={() => { runSync(); onDismiss(); }}>Sync Now</Button>
        </>
      }
      actions={
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
        </Dialog.Actions>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
});
