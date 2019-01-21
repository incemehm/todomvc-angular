import * as fromRoot from "./todo.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface State {
  todos: fromRoot.State;
}

export const reducers = {
  todos: fromRoot.reducer
};

export const getTodoState = createFeatureSelector<fromRoot.State>("todos");
export const getTodos = createSelector(getTodoState, state => state.todos);
export const getHasTodos = createSelector(getTodos, todos => todos.length > 0);

export const getActiveTodos = createSelector(getTodos, todos =>
  todos.filter(todo => !todo.completed)
);

export const getActiveCount = createSelector(
  getActiveTodos,
  todos => todos.length
);

export const getItemOrItems = createSelector(
  getActiveCount,
  count => (count === 1 ? "item" : "items")
);

export const getHasActive = createSelector(getActiveCount, count => count > 0);

export const getCompletedTodos = createSelector(getTodos, todos =>
  todos.filter(todo => todo.completed)
);

export const getCompletedCount = createSelector(
  getCompletedTodos,
  todos => todos.length
);

export const getHasCompleted = createSelector(
  getCompletedCount,
  count => count > 0
);
