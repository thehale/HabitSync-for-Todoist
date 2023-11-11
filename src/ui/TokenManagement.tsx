import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {Linking, View} from 'react-native';

import {useApiKey} from './useStorage';
import {useState} from 'react';

export function TokenManagement() {
  const [token, setToken] = useApiKey();
  const [text, setText] = useState(token);
  const [showHelp, setHelpVisible] = useState(false);
  const [showClearDialog, setClearDialogVisible] = useState(false);
  const theme = useTheme();
  return (
    <>
      {token && (
        <Button
          style={{margin: 10}}
          mode="outlined"
          textColor={theme.colors.error}
          onPress={() => setClearDialogVisible(true)}>
          Clear API Token
        </Button>
      )}
      {!token && (
        <View style={{gap: 10, margin: 10}}>
          <TextInput
            label={'Todoist API Token'}
            value={text}
            onChangeText={setText}
            right={
              <TextInput.Icon
                icon="help"
                onPress={() => setHelpVisible(true)}
              />
            }
          />
          <Button
            mode="contained"
            onPress={() => {
              setToken(text);
              setText('');
            }}>
            Set Token
          </Button>
        </View>
      )}
      <HelpDialog visible={showHelp} onDismiss={() => setHelpVisible(false)} />
      <ClearTokenDialog
        visible={showClearDialog}
        onAccept={() => {
          setToken('');
          setText('');
        }}
        onDismiss={() => setClearDialogVisible(false)}
      />
    </>
  );
}

interface HelpDialogProps {
  visible: boolean;
  onDismiss: () => void;
}
function HelpDialog({visible, onDismiss}: HelpDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>How to find the API Token</Dialog.Title>
        <Dialog.Content>
          <Text>
            An API token lets this app sync your completed tasks in Todoist with
            habits in Loop Habit Tracker. You can find your API token in the
            Todoist web application:
          </Text>
          <Text>{''}</Text>
          <Text>1. Open Web Settings</Text>
          <Text>2. Copy API token</Text>
          <Text>3. Paste the API token in this app</Text>
          <Text>{''}</Text>
          <Text>
            The token is stored on your device and only ever sent to Todoist
            when requesting the latest completed tasks.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
          <Button
            mode="contained"
            onPress={() => {
              Linking.openURL(
                'http://todoist.com/app/settings/integrations/developer',
              );
              onDismiss();
            }}>
            Open Web Settings
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
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
  const theme = useTheme();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Are you sure you want clear the API token?</Dialog.Title>
        <Dialog.Content>
          <Text>All syncs will stop until you set a new API token.</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button
            mode="contained"
            buttonColor={theme.colors.error}
            textColor={theme.colors.onError}
            onPress={() => {
              onAccept();
              onDismiss();
            }}>
            Clear
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
