import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";

import { AppComponent } from "./components/app.component";
import { HeaderComponent } from "./components/header.component";
import { MainComponent } from "./components/main.component";
import { FooterComponent } from "./components/footer.component";
import { TodoListComponent } from "./components/todo-list.component";
import { TodoItemComponent } from "./components/todo-item.component";

import * as fromRoot from "./store";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    TodoListComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(fromRoot.reducers),
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
