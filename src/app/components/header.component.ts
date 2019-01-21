import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromRoot from "../store";
import * as todoActions from "../store/todo.actions";

@Component({
  selector: "app-header",
  template: `
  	<header class="header">
				<h1>todos</h1>
				<input
					class="new-todo"
				 	placeholder="What needs to be done?"
					[(ngModel)]="title"
					(keydown.enter)="addTodo()"
					(keydown.esc)="cancelEdit()"
				  autofocus>
		</header>
  `
})
export class HeaderComponent {
  title = "";

  constructor(private store: Store<fromRoot.State>) {}

  addTodo() {
    const title = this.title;
    this.title = "";
    this.store.dispatch(new todoActions.AddTodo(title));
  }

  cancelEdit() {
    this.title = "";
  }
}
