import { Alert, NativeModules, StyleSheet, View } from 'react-native';
import { LoopHabit, PersistentTask } from '../types';
import { useCallback, useMemo, useRef, useState } from 'react';

import { Button, Card, Dialog, s, Text } from 'react-native-expressive';
import { useTodoistTasks } from './useTodoistTasks';
import { LegendList } from '@legendapp/list/react-native';

const { LoopHabitModule } = NativeModules;

export default function HabitList() {
  const tasks = useTodoistTasks();
  return (
    <View style={styles.container}>
      {tasks.length === 0 ? <NoHabits /> : <AllHabits tasks={tasks} />}
    </View>
  );
}

function NoHabits() {
  return (
    <View style={styles.empty}>
      <Text>
        <Text>No recently completed recurring tasks found in Todoist.</Text>
        <Text>{'\n\n'}</Text>
        <Text>Make sure you've set your API token.</Text>
        <Text>{'\n\n'}</Text>
        <Text>Also, try closing and re-opening the app.</Text>
      </Text>
    </View>
  )
}

interface AllHabitsProps {
  tasks: PersistentTask[];
}
function AllHabits({ tasks }: AllHabitsProps) {
  const task = useRef<PersistentTask>(null);

  const deleteDialog = useDialog({
    task,
    confirm: useCallback(() => task.current?.delete(), [task]),
  });
  const ignoreDialog = useDialog({
    task,
    confirm: useCallback(() => task.current?.ignore(), [task]),
  });
  const unlinkDialog = useDialog({
    task,
    confirm: useCallback(() => task.current?.setHabit(undefined), [task]),
  });
  const markDialog = useDialog({
    task,
    confirm: useCallback(async () => {
      const habit = task.current?.habit;
      if (!habit) return;
      try {
        await LoopHabitModule.takeHabitAction(habit.id, habit.action);
      } catch (e: any) {
        Alert.alert(e.message);
        console.log(JSON.stringify(e));
      }
    }, [task]),
  });

  const renderItem = useCallback(({ item }: { item: PersistentTask }) => (
    <Habit 
      item={item} 
      onRequestIgnore={ignoreDialog.request} 
      onRequestDelete={deleteDialog.request}
      onRequestUnlink={unlinkDialog.request}
      onRequestMark={markDialog.request}
    />
  ), [ignoreDialog, deleteDialog, unlinkDialog, markDialog]);
  const keyExtractor = useCallback((item: PersistentTask) => item.id, []);

  return (
    <>
      <LegendList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
      />
      <DeleteDialog
        visible={deleteDialog.visible}
        onAccept={deleteDialog.confirm}
        onDismiss={() => deleteDialog.setVisible(false)}
      />
      <IgnoreDialog
        visible={ignoreDialog.visible}
        onAccept={ignoreDialog.confirm}
        onDismiss={() => ignoreDialog.setVisible(false)}
      />
      <UnlinkHabitDialog
        visible={unlinkDialog.visible}
        onAccept={unlinkDialog.confirm}
        onDismiss={() => unlinkDialog.setVisible(false)}
      />
      <MarkHabitDialog
        visible={markDialog.visible}
        onAccept={markDialog.confirm}
        onDismiss={() => markDialog.setVisible(false)}
      />
    </>
  );
}

interface useDialogProps {
  task: React.RefObject<PersistentTask | null>;
  confirm: () => void;
}
function useDialog({ task, confirm }: useDialogProps) {
  const [visible, setVisible] = useState(false);
  const request = useCallback((item: PersistentTask) => {
    task.current = item;
    setVisible(true);
  }, [task]);

  const dialog = useMemo(() => ({
    visible,
    setVisible,
    request,
    confirm
  }), [visible, request, confirm]);

  return dialog;
}

interface HabitProps {
  item: PersistentTask;
  onRequestDelete: (item: PersistentTask) => void;
  onRequestIgnore: (item: PersistentTask) => void;
  onRequestUnlink: (item: PersistentTask) => void;
  onRequestMark: (item: PersistentTask) => void;
}
function Habit({ item, onRequestIgnore, onRequestDelete, onRequestUnlink, onRequestMark }: HabitProps) {
  const [habit, setHabit] = useState<LoopHabit | undefined>(item.habit);
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
  const content = item.ignored ? 'IGNORED' : habit ? `Loop Habit > ${habit.name}` : null;
  return (
    <Card
      title={item.title}
      content={content}
      actions={
        <Card.Actions>
          <Button mode="text" intent="danger" onPress={() => onRequestDelete(item)}>Delete</Button>
          {!item.ignored && !item.habit && <Button mode="text" onPress={() => onRequestIgnore(item)}>Ignore</Button>}
          {habit && (<Button mode="text" intent="danger" onPress={() => onRequestUnlink(item)}>Unlink</Button>)}
          {habit && (<Button mode="tonal" onPress={() => onRequestMark(item)}>Test</Button>)}
          {!habit && (<Button mode="contained" onPress={linkHabit}>Link</Button>)}
        </Card.Actions>
      }
    />
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { gap: s.space.default, padding: s.space.default },
  empty: { flex: 1, justifyContent: 'center', marginHorizontal: "10%" },
});
