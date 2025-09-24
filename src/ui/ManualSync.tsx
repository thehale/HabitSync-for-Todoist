import React, { useState } from 'react';

import Button from '@components/Button';
import Dialog from '@components/Dialog';
import Text from '@components/Text';
import { Linking, View } from 'react-native';

const runSync = require('../tasks/TodoistHabitSync');

export default function ManualSync() {
  const [showDialog, setDialogVisible] = useState(false);
  return (
    <View>
      <Button mode="tonal" onPress={() => setDialogVisible(true)}>Run a Habit Sync</Button>
      <SyncDialog
        visible={showDialog}
        onDismiss={() => setDialogVisible(false)}
      />
    </View>
  );
}

interface SyncDialogProps {
  visible: boolean;
  onDismiss: () => void;
}
function SyncDialog({ visible, onDismiss }: SyncDialogProps) {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}
      title="What is a habit sync?"
      content={
        <Text>
          Every 15 minutes, this app will automatically check Todoist for the
          day's completed recurring tasks and update your linked habits in Loop
          Habit Tracker.
          {'\n\n'}
          If the sync isn't working, check this app's battery settings to make
          sure it can run in the background without restrictions.
          {'\n\n'}
          You can also manually trigger a sync by pressing the button below.
        </Text>
      }
      actions={
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button mode="tonal" onPress={() => Linking.sendIntent("android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS")}>Battery Settings</Button>
          <Button mode="contained" onPress={() => { runSync(); onDismiss(); }}>Run Sync</Button>
        </Dialog.Actions>
      }
    />
  );
}
