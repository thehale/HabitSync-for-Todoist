import { Linking, View } from 'react-native';

import Button from '@components/Button';
import Dialog from '@components/Dialog';
import Text from '@components/Text';
import TextInput from '@components/TextInput';
import { useApiKey } from './useStorage';
import { useState } from 'react';

export function TokenManagement() {
  const [token, setToken] = useApiKey();
  const [text, setText] = useState(token);
  const [showHelp, setHelpVisible] = useState(false);
  const [showClearDialog, setClearDialogVisible] = useState(false);
  return (
    <>
      {token && <Button onPress={() => setClearDialogVisible(true)}>Clear API Token</Button>}
      {!token && (
        <View style={{ gap: 10 }}>
          <TextInput 
            placeholder='Todoist API Token'
            value={text}
            onChangeText={setText}
            after={<Button onPress={() => setHelpVisible(true)}> ? </Button>}
          />
          <Button onPress={() => { setToken(text); setText(''); }}>Set Token</Button>
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
          <Button onPress={() => { Linking.openURL('http://todoist.com/app/settings/integrations/developer'); onDismiss(); }}>Open Web Settings</Button>
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
      actions={[
        (<Button onPress={onDismiss}>Cancel</Button>),
        (<Button onPress={() => { onAccept(); onDismiss(); }}>Clear</Button>),
      ]}
    />
  );
}
