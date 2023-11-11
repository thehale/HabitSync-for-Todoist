import {
  Alert,
  Button,
  Linking,
  NativeModules,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback} from 'react';

const {LoopHabitModule} = NativeModules;

type SendIntentButtonProps = {
  action: string;
  children: string;
  extras?: Array<{
    key: string;
    value: string | number | boolean;
  }>;
};

const SendIntentButton = ({
  action,
  extras,
  children,
}: SendIntentButtonProps) => {
  const handlePress = useCallback(async () => {
    try {
      await LoopHabitModule.openHabitSelector();
      // await Linking.sendIntent(action, extras);
    } catch (e: any) {
      Alert.alert(e.message);
      console.log(JSON.stringify(e));
    }
  }, [action, extras]);

  return <Button title={children} onPress={handlePress} />;
};

const App = () => {
  return (
    <View style={styles.container}>
      <SendIntentButton
        action="org.isoron.uhabits.automation.EditSettingActivity"
        extras={[
          {
            key: 'android.provider.extra.APP_PACKAGE',
            value: 'org.isoron.uhabits',
          },
        ]}>
        Select Habit
      </SendIntentButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
