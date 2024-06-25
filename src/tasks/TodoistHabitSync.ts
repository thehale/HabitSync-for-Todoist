import { NativeModules } from "react-native";
import { Storage } from "../lib/Storage";
import { queryTasks } from "../lib/Todoist"

const { LoopHabitModule } = NativeModules;


module.exports = async () => {
  const apiToken = Storage.ApiKey.read();
  const recentlyCompletedTaskIDs = (await queryTasks(apiToken, Storage.LastSync.read())).map(t => t.id);
  const storedTasks = Storage.Tasks.read()
  const habitTasks = storedTasks.filter(t => t.habit != undefined).filter(t => recentlyCompletedTaskIDs.includes(t.id))
  console.log(`Marking ${habitTasks.length} habits as done.`)
  // @ts-ignore
  habitTasks.forEach(async t => await LoopHabitModule.takeHabitAction(t.habit.id, t.habit.action));
  Storage.LastSync.write(new Date())
}
