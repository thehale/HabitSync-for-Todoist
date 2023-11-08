import {Button, TextInput} from 'react-native-paper';

import {useApiKey} from './useStorage';
import {useState} from 'react';

export function TokenManagement() {
  const [token, setToken] = useApiKey();
  const [text, setText] = useState(token);
  return token ? (
    <Button onPress={() => setToken('')}>Clear Token</Button>
  ) : (
    <>
      <TextInput
        label={'Todoist API Key'}
        value={text}
        onChangeText={setText}
      />
      <Button
        onPress={() => {
          setToken(text);
          setText('');
        }}>
        Set Token
      </Button>
    </>
  );
}
