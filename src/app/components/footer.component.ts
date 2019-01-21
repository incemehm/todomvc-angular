import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromRoot from "../store";
import * as todoActions from "../store/todo.actions";

@Component({
  selector: "app-footer",
  template: `
    <footer class="footer">
      <!-- This should be '0 items left' by default -->
      <span class="todo-count"><strong>{{activeCount$ | async}}</strong> {{itemOrItems$ | async}} left</span>
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <a class="selected" href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button *ngIf="hasCompleted$ | async" (click)="clearCompleted()" class="clear-completed">Clear completed</button>
    </footer>  
  `
})
export class FooterComponent {
  activeCount$: Observable<number>;
  hasCompleted$: Observable<boolean>;
  itemOrItems$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.activeCount$ = this.store.pipe(select(fromRoot.getActiveCount));
    this.hasCompleted$ = this.store.pipe(select(fromRoot.getHasCompleted));
    this.itemOrItems$ = this.store.pipe(select(fromRoot.getItemOrItems));
  }

  clearCompleted() {
    this.store.dispatch(new todoActions.ClearCompleted());
  }
}
