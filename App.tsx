import {
  Alert,
  Button,
  Linking,
  NativeModules,
  StyleSheet,
  Text,
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
  const [habitName, setHabitName] = React.useState<string>('???');
  const [habitId, setHabitId] = React.useState<string>('???');
  const [actionId, setActionId] = React.useState<string>('???');
  const handlePress = useCallback(async () => {
    try {
      const details = await LoopHabitModule.openHabitSelector();
      setHabitName(details.blurb);
      setHabitId(details.habit);
      setActionId(details.action);
      console.log(JSON.stringify(details));
      // await Linking.sendIntent(action, extras);
    } catch (e: any) {
      Alert.alert(e.message);
      console.log(JSON.stringify(e));
    }
  }, [action, extras]);

  const handleHabitAction = useCallback(async () => {
    try {
      await LoopHabitModule.takeHabitAction(habitId, actionId);
    } catch (e: any) {
      Alert.alert(e.message);
      console.log(JSON.stringify(e));
    }
  }, [habitId, actionId]);

  return (
    <>
      <Button title={children} onPress={handlePress} />
      <Text>{`Habit Name: ${habitName}`}</Text>
      <Text>{`Habit ID: ${habitId}`}</Text>
      <Text>{`Action ID: ${actionId}`}</Text>
      <Button title={"Carry out Habit Action"} onPress={handleHabitAction} />
    </>
  );
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
