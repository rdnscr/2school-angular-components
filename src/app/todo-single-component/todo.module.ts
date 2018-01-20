import { MatButtonModule, MatInputModule, MatSnackBarModule, MatCardModule, MatCheckboxModule, MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoComponent } from './todo.component';
import { NgModule } from '@angular/core';
import { todoRoutesModule } from './todo.routes';

console.log('`Todo` bundle loaded asynchronously');

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSnackBarModule, MatCardModule,
        MatCheckboxModule, MatListModule, HttpClientModule, FlexLayoutModule, todoRoutesModule],
    declarations: [TodoComponent],
})
export class TodoSingleComponentModule {

}
