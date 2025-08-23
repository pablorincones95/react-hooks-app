import type { TaskState, Todo } from "./taskInitialState";

export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

export const TaskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        pending: state.pending + 1,
      };
    }
    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      };
    }
    case "DELETE_TODO": {
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );

      return {
        ...state,
        todos: filteredTodos,
        length: filteredTodos.length,
        completed: filteredTodos.filter((todo) => todo.completed).length,
        pending: filteredTodos.filter((todo) => !todo.completed).length,
      };
    }
    default:
      return state;
  }
};
