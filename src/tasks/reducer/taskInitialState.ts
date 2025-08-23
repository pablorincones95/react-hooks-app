import * as z from "zod";

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

const todoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const taskStateSchema = z.object({
  todos: z.array(todoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getTasksInitialState = (): TaskState => {
  const localStorageState = localStorage.getItem("tasksState");
  if (!localStorageState) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }

  // validate the parsed state against the schema
  const parsedState = JSON.parse(localStorageState);
  const validation = taskStateSchema.safeParse(parsedState);
  if (validation.error) {
    console.log("Invalid tasks state in localStorage:", validation.error);
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }

  return validation.data;
};
