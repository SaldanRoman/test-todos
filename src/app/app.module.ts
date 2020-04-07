import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { TodosComponent } from './components/todos/todos.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AddTodoFormComponent } from './components/todos/add-todo-form/add-todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalformComponent } from './components/todos/modalform/modalform.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TodosComponent,
    LoginComponent,
    AddTodoFormComponent,
    ModalformComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
