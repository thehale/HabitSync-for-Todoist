export interface LoopHabit {
  id: string;
  name: string;
  action: string;
}

export interface TodoistActivity {
  event_date: string;
  event_type: string;
  extra_data: {
    content: string;
    due_date: string;
    is_recurring: boolean;
  },
  object_id: string;
  object_type: string;
  initiator_id: string;
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