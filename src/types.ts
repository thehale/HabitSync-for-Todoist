export interface LoopHabit {
  id: string;
  name: string;
  action: string;
}
export interface TodoistTask {
  completed_at: string;
  content: string;
  id: string;
  item_object: {
    id: string;
    content: string;
    due: {
      is_recurring: boolean;
    };
  };

}
export interface Task {
  id: string;
  occurrenceId: string;
  title: string;
  completedAt: Date;
  isRecurring: boolean;
  habit?: LoopHabit;
  ignored?: boolean;
}
export interface PersistentTask extends Task {
  setHabit: (habit?: LoopHabit) => void;
  delete: () => void;
  ignore: () => void;
}