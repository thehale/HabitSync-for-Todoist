import {Alert, FlatList, NativeModules, View} from 'react-native';
import {
  Button,
  Card,
  Dialog,
  Divider,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import {LoopHabit, PersistentTask} from '../types';
import {useCallback, useState} from 'react';

import {useTodoistTasks} from './useTodoistTasks';

const {LoopHabitModule} = NativeModules;

interface HabitProps {
  item: PersistentTask;
}
function Habit({item}: HabitProps) {
  const theme = useTheme();
  const [showMarkHabitDialog, setMarkHabitDialogVisible] = useState(false);
  const [showDeleteDialog, setDeleteDialogVisible] = useState(false);
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
  return (
    <>
      <Card>
        <Card.Title
          title={item.title}
          subtitle={
            <>
              <Text>
                <Text style={{fontStyle: 'italic'}}>Todoist ID: </Text>
                {item.id}
              </Text>
              <Text>{'\n'}</Text>
              <Text>
                <Text style={{fontStyle: 'italic'}}>Loop Habit: </Text>
                <Text>{habit ? habit.name : 'Nothing'}</Text>
              </Text>
            </>
          }
          subtitleNumberOfLines={2}
        />
        <Card.Actions>
          <Button
            mode="text"
            textColor={theme.colors.error}
            onPress={() => setDeleteDialogVisible(true)}>
            Delete
          </Button>
          {habit && (
            <Button
              mode="text"
              textColor={theme.colors.error}
              onPress={() => setUnlinkDialogVisible(true)}>
              Unlink Habit
            </Button>
          )}
          {habit && (
            <Button mode="text" onPress={() => setMarkHabitDialogVisible(true)}>
              Test Run
            </Button>
          )}
          {!habit && <Button onPress={linkHabit}>Link Habit</Button>}
        </Card.Actions>
      </Card>
      <DeleteDialog
        visible={showDeleteDialog}
        onAccept={() => item.delete()}
        onDismiss={() => setDeleteDialogVisible(false)}
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
function DeleteDialog({visible, onAccept, onDismiss}: DeleteDialogProps) {
  const theme = useTheme();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Are you sure you want to delete this task?</Dialog.Title>
        <Dialog.Content>
          <Text>
            If you only want to stop marking the habit when the task is
            complete, unlink the habit instead.
          </Text>
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
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
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
  const theme = useTheme();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Are you sure you want to unlink this task?</Dialog.Title>
        <Dialog.Content>
          <Text>
            Completing this task in Todoist will no longer update the linked
            habit in Loop Habit Tracker.
          </Text>
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
            Unlink
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
interface MarkHabitDialogProps {
  visible: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}
function MarkHabitDialog({visible, onAccept, onDismiss}: MarkHabitDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>What happens during a test run?</Dialog.Title>
        <Dialog.Content>
          <Text>
            This app will tell Loop Habit Tracker to update the linked habit.
          </Text>
          <Text>{''}</Text>
          <Text>
            After the test run, check Loop Habit Tracker to make sure the habit
            was updated as you expected. If not, unlink the habit and try again.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
          <Button
            mode="contained"
            onPress={() => {
              onAccept();
              onDismiss();
            }}>
            Run Test
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

function HabitList() {
  const tasks = useTodoistTasks();
  console.debug(new Date(), tasks.length);
  return (
    <View style={{flex: 1}}>
      {tasks.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>
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
          renderItem={({item}) => <Habit item={item} />}
          ItemSeparatorComponent={Divider}
          keyExtractor={item => item.id}
          contentContainerStyle={{gap: 8, padding: 8}}
        />
      )}
    </View>
  );
}

export default HabitList;
