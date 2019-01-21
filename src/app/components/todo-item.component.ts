import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { Todo } from "../models/todo.model";
import * as fromRoot from "../store";
import * as todoActions from "../store/todo.actions";

@Component({
  selector: "app-todo-item",
  template: `
    <li [ngClass]="{'completed':todo.completed, 'editing': editing}">
      <div class="view">
        <input class="toggle" type="checkbox" [checked]='todo.completed'
        (click)="toggleCompleted()">
        <label (dblclick)="startEdit(titleInput)">{{todo.title}}</label>
        <button class="destroy"></button>
      </div>
      <input #titleInput 
             [(ngModel)]="title" 
             class="edit"
             (blur)="endEdit()"
             (keydown.enter)="endEdit()"
             (keydown.esc)="cancelEdit()"
             >
    </li>  
  `
})
export class TodoItemComponent {
  @Input() todo: Todo;
  editing = false;
  title = "";
  constructor(private store: Store<fromRoot.State>) {}

  toggleCompleted() {
    const nextTodo = { ...this.todo, completed: !this.todo.completed };
    this.store.dispatch(new todoActions.UpdateTodo(nextTodo));
  }

  startEdit(el) {
    this.editing = true;
    this.title = this.todo.title;
    setTimeout(() => el.focus());
  }

  endEdit() {
    if (!this.editing) {
      return;
    }
    this.editing = false;
    const title = this.title;
    this.title = "";
    const nextTodo = { ...this.todo, title };
    this.store.dispatch(new todoActions.UpdateTodo(nextTodo));
  }

  cancelEdit() {
    this.editing = false;
  }
}
