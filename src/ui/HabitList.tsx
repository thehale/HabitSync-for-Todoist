import {
  Alert,
  FlatList,
  NativeModules,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Button, Card, Divider, Text} from 'react-native-paper';
import {LoopHabit, PersistentTask} from './types';
import {useCallback, useState} from 'react';

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
  const tasks = useTodoistTasks(TODOIST_API_TOKEN);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({item}) => <Habit item={item} />}
        contentContainerStyle={{gap: 8, width: '100%'}}
        ItemSeparatorComponent={Divider}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});

export default HabitList;
