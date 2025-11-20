import { Linking, StyleSheet, View } from 'react-native';

import { Button, Dialog, Text, TextInput } from 'react-native-expressive';
import { useApiKey } from './useStorage';
import { useState } from 'react';

const styles = StyleSheet.create({
  container: { gap: 10 },
  inset: { marginHorizontal: 2 },
})

export function TokenManagement() {
  const [token, setToken] = useApiKey();
  const [text, setText] = useState(token);
  const [showHelp, setHelpVisible] = useState(false);
  const [showClearDialog, setClearDialogVisible] = useState(false);
  return (
    <>
      {token && <Button mode="outlined" intent="danger" onPress={() => setClearDialogVisible(true)}>Clear API Token</Button>}
      {!token && (
        <View style={styles.container}>
          <View style={styles.inset}>
            <TextInput
              placeholder='Todoist API Token'
              value={text}
              onChangeText={setText}
              after={<Button mode="tonal" onPress={() => setHelpVisible(true)}> ? </Button>}
            />
          </View>
          <Button mode="contained" onPress={() => { setToken(text); setText(''); }}>Set Token</Button>
        </View>
      )}
      <HelpDialog visible={showHelp} onDismiss={() => setHelpVisible(false)} />
      <ClearTokenDialog
        visible={showClearDialog}
        onAccept={() => { setToken(''); setText(''); }}
        onDismiss={() => setClearDialogVisible(false)}
      />
    </>
  );
}

interface HelpDialogProps {
  visible: boolean;
  onDismiss: () => void;
}
function HelpDialog({ visible, onDismiss }: HelpDialogProps) {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}
      title="How to find the API Token"
      content={
        <Text>
          An API token lets this app sync your completed tasks in Todoist with
          habits in Loop Habit Tracker. You can find your API token in the
          Todoist web application:
          {'\n\n'}
          1. Open Web Settings
          {'\n'}
          2. Copy API token
          {'\n'}
          3. Paste the API token in this app
          {'\n\n'}
          The token is stored on your device and only ever sent to Todoist
          when requesting the latest completed tasks.
        </Text>
      }
      actions={
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
          <Button mode="contained" onPress={() => { Linking.openURL('http://todoist.com/app/settings/integrations/developer'); onDismiss(); }}>Open Web Settings</Button>
        </Dialog.Actions>
      }
    />
  );
}

interface ClearTokenDialogProps {
  visible: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}
function ClearTokenDialog({
  visible,
  onAccept,
  onDismiss,
}: ClearTokenDialogProps) {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}
      title="Are you sure you want clear the API token?"
      content={"All syncs will stop until you set a new API token."}
      actions={
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button mode="contained" intent="danger" onPress={() => { onAccept(); onDismiss(); }}>Disable Syncs</Button>
        </Dialog.Actions>
      }
    />
  );
}
