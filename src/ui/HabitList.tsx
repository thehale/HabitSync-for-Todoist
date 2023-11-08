import {Alert, FlatList, NativeModules, View} from 'react-native';
import {Button, Card, Divider, Text} from 'react-native-paper';
import {LoopHabit, PersistentTask} from './types';
import {useCallback, useState} from 'react';

import {useApiKey} from './useStorage';
import {useTodoistTasks} from './useTodoistTasks';

const {LoopHabitModule} = NativeModules;

interface HabitProps {
  item: PersistentTask;
}
function Habit({item}: HabitProps) {
  const [habit, setHabit] = useState<LoopHabit | undefined>(item.habit);
  const unlinkHabit = () => {
    setHabit(undefined);
    item.setHabit(undefined);
  };
  const linkHabit = useCallback(async () => {
    try {
      const details = await LoopHabitModule.openHabitSelector();
      const newHabit = {
        name: details.blurb,
        id: details.habit,
        action: details.action,
      };
      setHabit(newHabit);
      item.setHabit(newHabit);
    } catch (e: any) {
      Alert.alert(e.message);
      console.log(JSON.stringify(e));
    }
  }, [item]);
  const markHabit = useCallback(async () => {
    if (!habit) {
      return;
    }
    try {
      await LoopHabitModule.takeHabitAction(habit.id, habit.action);
    } catch (e: any) {
      Alert.alert(e.message);
      console.log(JSON.stringify(e));
    }
  }, [habit]);
  return (
    <Card>
      <Card.Title title={item.title} subtitle={`id: ${item.objectId}`} />
      <Card.Content>
        <Text>{habit ? habit.name : 'No matching Habit'}</Text>
      </Card.Content>
      <Card.Actions>
        {habit && <Button onPress={markHabit}>Mark Habit</Button>}
        {habit ? (
          <Button onPress={unlinkHabit}>Unlink Habit</Button>
        ) : (
          <Button onPress={linkHabit}>Link Habit</Button>
        )}
      </Card.Actions>
    </Card>
  );
}

function HabitList() {
  const [token] = useApiKey();
  const tasks = useTodoistTasks(token);
  console.debug(new Date(), tasks.length);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={tasks}
        renderItem={({item}) => <Habit item={item} />}
        ItemSeparatorComponent={Divider}
        keyExtractor={item => item.id}
        contentContainerStyle={{gap: 8, padding: 8}}
      />
    </View>
  );
}

export default HabitList;
