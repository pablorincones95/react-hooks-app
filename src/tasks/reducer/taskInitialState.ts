export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export const getTasksInitialState = (): TaskState => {
  return {
    todos: [],
    length: 0,
    completed: 0,
    pending: 0,
  };
};
