import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {TodoService} from './todo.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { QRCodeModule } from 'angularx-qrcode';
import { HomeComponent } from './home/home.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';

const routes: Routes = [
  { path : 'home', component: HomeComponent },
  { path: 'todolist', component: TodoListComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', }

];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent, 
    HomeComponent, SpeechToTextComponent

  ],
  imports: [
    BrowserModule, FormsModule,  RouterModule.forRoot(routes), ReactiveFormsModule, QRCodeModule
  ],
  exports: [RouterModule],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }