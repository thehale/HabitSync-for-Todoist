/**
 * @format
 */

import App from './App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

AppRegistry.registerHeadlessTask('todoist-habit-sync', () =>
  require('./src/tasks/TodoistHabitSync'),
);

AppRegistry.registerComponent(appName, () => App);
