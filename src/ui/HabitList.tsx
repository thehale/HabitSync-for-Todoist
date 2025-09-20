import { Alert, FlatList, NativeModules, StyleSheet, View } from 'react-native';
import { LoopHabit, PersistentTask } from '../types';
import { useCallback, useState } from 'react';

import Button from '@components/Button';
import Card from '@components/Card';
import Dialog from '@components/Dialog';
import Text from '@components/Text';
import { useTodoistTasks } from './useTodoistTasks';

const { LoopHabitModule } = NativeModules;

interface HabitProps {
  item: PersistentTask;
}
function Habit({ item }: HabitProps) {
  const [showMarkHabitDialog, setMarkHabitDialogVisible] = useState(false);
  const [showDeleteDialog, setDeleteDialogVisible] = useState(false);
  const [showIgnoreDialog, setIgnoreDialogVisible] = useState(false);
  const [showUnlinkDialog, setUnlinkDialogVisible] = useState(false);
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
  const content = [
    `Todoist ID: ${item.id}`,
    item.ignored ? 'IGNORED' : `Loop Habit: ${habit ? habit.name : 'Nothing'}`,
  ].join('\n');
  return (
    <>
      <Card
        title={item.title}
        content={content}
        actions={
          <Card.Actions>
            <Button mode="text" intent="danger" onPress={() => setDeleteDialogVisible(true)}>Delete</Button>
            {!item.ignored && !item.habit && <Button mode="text" onPress={() => setIgnoreDialogVisible(true)}>Ignore</Button>}
            {habit && (<Button mode="text" intent="danger" onPress={() => setUnlinkDialogVisible(true)}>Unlink Habit</Button>)}
            {habit && (<Button mode="tonal" onPress={() => setMarkHabitDialogVisible(true)}>Test Run</Button>)}
            {!habit && (<Button mode="contained" onPress={linkHabit}>Link Habit</Button>)}
          </Card.Actions>
        }
      />
      <DeleteDialog
        visible={showDeleteDialog}
        onAccept={() => item.delete()}
        onDismiss={() => setDeleteDialogVisible(false)}
      />
      <IgnoreDialog
        visible={showIgnoreDialog}
        onAccept={() => item.ignore()}
        onDismiss={() => setIgnoreDialogVisible(false)}
      />
      <UnlinkHabitDialog
        visible={showUnlinkDialog}
        onAccept={unlinkHabit}
        onDismiss={() => setUnlinkDialogVisible(false)}
      />
      <MarkHabitDialog
        visible={showMarkHabitDialog}
        onAccept={markHabit}
        onDismiss={() => setMarkHabitDialogVisible(false)}
      />
    </>
  );
}

interface DeleteDialogProps {
  visible: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}
function DeleteDialog({ visible, onAccept, onDismiss }: DeleteDialogProps) {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}
      title="Are you sure you want to delete this task?"
      content="If you only want to stop marking the habit when the task is complete, unlink the habit instead."
      actions={
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button mode="contained" intent="danger" onPress={() => { onAccept(); onDismiss(); }}>Delete</Button>
        </Dialog.Actions>
      }
    />

  );
}
interface IgnoreDialogProps {
  visible: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}
function IgnoreDialog({ visible, onAccept, onDismiss }: IgnoreDialogProps) {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}
      title="Ignore this task?"
      content="The task will be at the bottom of the list if you change your mind."
      actions={
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button mode="contained" onPress={() => { onAccept(); onDismiss(); }}>Ignore</Button>
        </Dialog.Actions>
      }
    />
  );
}
interface UnlinkHabitDialogProps {
  visible: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}
function UnlinkHabitDialog({
  visible,
  onAccept,
  onDismiss,
}: UnlinkHabitDialogProps) {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}
      title="Are you sure you want to unlink this task?"
      content="Completing this task in Todoist will no longer update the linked habit in Loop Habit Tracker."
      actions={
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={() => { onAccept(); onDismiss(); }}>Unlink</Button>
        </Dialog.Actions>
      }
    />
  );
}
interface MarkHabitDialogProps {
  visible: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}
function MarkHabitDialog({ visible, onAccept, onDismiss }: MarkHabitDialogProps) {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}
      title="What happens during a test run?"
      content={
        <Text>
          This app will tell Loop Habit Tracker to update the linked habit.
          {'\n\n'}
          After the test run, check Loop Habit Tracker to make sure the habit
          was updated as you expected. If not, unlink the habit and try again.
        </Text>
      }
      actions={
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={() => { onAccept(); onDismiss(); }}>Run Test</Button>
        </Dialog.Actions>
      }
    />
  );
}

function HabitList() {
  const tasks = useTodoistTasks();
  console.debug(new Date(), tasks.length);
  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.empty}>
          <Text>
            <Text>No recently completed recurring tasks found in Todoist.</Text>
            <Text>{'\n\n'}</Text>
            <Text>Make sure you've set your API token.</Text>
            <Text>{'\n\n'}</Text>
            <Text>Also, try closing and re-opening the app.</Text>
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={({ item }) => <Habit item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { gap: 8, padding: 8 },
  empty: { flex: 1, justifyContent: 'center', marginHorizontal: "10%" },
});

export default HabitList;
