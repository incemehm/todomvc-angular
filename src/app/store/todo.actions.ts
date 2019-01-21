import { Action } from "@ngrx/store";
import { Todo } from "../models/todo.model";

export const ADD_TODO = "[todomvc] ADD_TODO";
export const UPDATE_TODO = "[todomvc] UPDATE_TODO";
export const DELETE_TODO = "[todomvc] DELETE_TODO";
export const CLEAR_COMPLETED = "[todomvc] CLEAR_COMPLETED";
export const TOGGLE_ALL = "[todomvc] TOGGLE_ALL";

export class AddTodo implements Action {
  readonly type = ADD_TODO;

  constructor(public payload: string) {}
}

export class UpdateTodo implements Action {
  readonly type = UPDATE_TODO;

  constructor(public payload: Todo) {}
}

export class DeleteTodo implements Action {
  readonly type = DELETE_TODO;

  constructor(public payload: Todo) {}
}

export class ClearCompleted implements Action {
  readonly type = CLEAR_COMPLETED;
}

export class ToggleAll implements Action {
  readonly type = TOGGLE_ALL;

  constructor(public payload: boolean) {}
}
