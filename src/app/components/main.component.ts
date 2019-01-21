import { Component, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { takeWhile } from "rxjs/operators/takeWhile";
import * as fromRoot from "../store";
import * as todoActions from "../store/todo.actions";

@Component({
  selector: "app-main",
  template: `
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input id="toggle-all" 
             class="toggle-all"
             type="checkbox"
             [checked]="hasActive"
             (click)="toggleAll()">
      <label for="toggle-all">Mark all as complete</label>
      <app-todo-list></app-todo-list>
    </section>  
  `
})
export class MainComponent implements OnDestroy {
  hasActive: boolean;
  componentActive = true;

  constructor(private store: Store<fromRoot.State>) {
    store
      .pipe(select(fromRoot.getHasActive))
      .pipe(takeWhile(() => this.componentActive))
      .forEach(active => {
        this.hasActive = active;
      });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  toggleAll() {
    this.store.dispatch(new todoActions.ToggleAll(this.hasActive));
  }
}
