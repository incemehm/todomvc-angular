import { Action, createSelector, createFeatureSelector } from "@ngrx/store";
import * as todoActions from "./todo.actions";
import { Todo } from "../models/todo.model";

export interface State {
  todos: Todo[];
}

const initialState: State = {
  todos: [
    { id: 1, title: "Taste JavaScript", completed: true },
    { id: 2, title: "Buy a unicorn", completed: false }
  ]
};

function nextTodoId(todos: Todo[]): number {
  let id = 0;

  todos.forEach(todo => {
    if (todo.id > id) {
      id = todo.id;
    }
  });

  return id + 1;
}

function handleAdd(state: State, title: string): State {
  const todo = { id: nextTodoId(state.todos), title: title, completed: false };
  const nextTodos = [...state.todos, todo];
  return { ...state, todos: nextTodos };
}

function handleUpdate(state: State, todo: Todo): State {
  const nextTodos = state.todos.map(td => (td.id === todo.id ? todo : td));
  return { ...state, todos: nextTodos };
}

function handleDelete(state: State, todo: Todo): State {
  const nextTodos = state.todos.filter(td => td.id !== todo.id);
  return { ...state, todos: nextTodos };
}

function handleClearCompleted(state: State): State {
  const nextTodos = state.todos.filter(todo => !todo.completed);
  return { ...state, todos: nextTodos };
}

function handleToggleAll(state: State, completed: boolean): State {
  const nextTodos = state.todos.map(td => ({ ...td, completed }));
  return { ...state, todos: nextTodos };
}

export const getTodoState = createFeatureSelector<State>("todos");
export const getTodos = (state: State) =>
  createSelector(getTodoState, s => s.todos);

export function reducer(state = initialState, action) {
  switch (action.type) {
    case todoActions.ADD_TODO:
      return handleAdd(state, action.payload);
    case todoActions.UPDATE_TODO:
      return handleUpdate(state, action.payload);
    case todoActions.DELETE_TODO:
      return handleDelete(state, action.payload);
    case todoActions.CLEAR_COMPLETED:
      return handleClearCompleted(state);
    case todoActions.TOGGLE_ALL:
      return handleToggleAll(state, action.payload);
    default:
      return state;
  }
}
