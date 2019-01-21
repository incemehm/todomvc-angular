import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromRoot from "../store";

import { Todo } from "../models/todo.model";

@Component({
  selector: "app-todo-list",
  template: `  
    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <app-todo-item *ngFor="let todo of todos$ | async" [todo]="todo"></app-todo-item>
    </ul>  
  `
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.todos$ = this.store.pipe(select(fromRoot.getTodos));
    // fromTodos.getTodos
    //     this.todos$ = store.pipe(select(fromTodos.getTodos));
  }
}
