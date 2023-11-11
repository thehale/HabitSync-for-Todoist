import {Button, Dialog, Portal} from 'react-native-paper';
import React, {useState} from 'react';
import {Text, View} from 'react-native';

const runSync = require('../tasks/TodoistHabitSync');

export default function ManualSync() {
  const [showDialog, setDialogVisible] = useState(false);
  return (
    <View>
      <Button
        style={{margin: 10}}
        mode="contained-tonal"
        onPress={() => setDialogVisible(true)}>
        Run a Habit Sync
      </Button>
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
function SyncDialog({visible, onDismiss}: SyncDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>What is a habit sync?</Dialog.Title>
        <Dialog.Content>
          <Text>
            Every 15 minutes, this app will automatically check Todoist for the
            day's completed recurring tasks and update your linked habits in
            Loop Habit Tracker.
          </Text>
          <Text>{''}</Text>
          <Text>
            If the sync isn't working, check this app's battery settings to make
            sure it can run in the background without restrictions.
          </Text>
          <Text>{''}</Text>
          <Text>
            You can also manually trigger a sync by pressing the button below.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button
            mode="contained"
            onPress={() => {
              runSync();
              onDismiss();
            }}>
            Run Sync
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
