import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { NgModule } from '@angular/core';
import { todoRoutesModule } from './todo.routes';

console.log('`Todo` bundle loaded asynchronously');

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, todoRoutesModule],
    declarations: [TodoComponent],
})
export class TodoSingleComponentModule {

}
