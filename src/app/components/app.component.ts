import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromRoot from "../store";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-root",
  template: `
    <section class="todoapp">
      <app-header></app-header>
      <app-main *ngIf="hasTodos$ | async"></app-main>
      <app-footer *ngIf="hasTodos$ | async"></app-footer>
		</section>
		<footer class="info">
			<p>Double-click to edit a todo</p>		
			<p>Created by <a href="http://github.com/ralli">Ralph Juhnke</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
  `
})
export class AppComponent {
  hasTodos$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.hasTodos$ = this.store.pipe(select(fromRoot.getHasTodos));
  }
}
