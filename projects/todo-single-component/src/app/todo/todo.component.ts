import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { cloneArray, TodoItem } from '../shared';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@ngbracket/ngx-layout/flex';

@Component({
    selector: 'todo-view',
    templateUrl: './todo.component.html',
    standalone: true,
    imports: [
        FlexModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        NgFor,
        MatCheckboxModule,
        DatePipe,
        MatSnackBarModule,
    ],
})
export class TodoComponent implements OnInit {
    private todos: TodoItem[] | undefined;
    private orig: TodoItem[] | undefined;

    @ViewChild('description', { static: true }) private descriptionInput: ElementRef | undefined;

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {

    }

    public ngOnInit() {
        this.http.get<TodoItem[]>('assets/mock-data/todos.json')
            .subscribe((result) => {
                this.orig = result;
                this.todos = cloneArray(result);
            });
    }

    public onAdd(newItemDescription: string) {
        const newItem = { description: newItemDescription, checked: false, lastModified: new Date(), id: 0 };

        if(this.descriptionInput) {
          this.descriptionInput.nativeElement.value = '';
        }

        this.snackBar.open(`Item with description "${newItemDescription} added`, undefined, { duration: 1500 });
        this.todos?.push(newItem);
        this.snackBar.open('add item', undefined, { duration: 1500 });
    }

    public onReset(): void {
        this.todos = this.orig ? cloneArray(this.orig) : this.orig;
        this.snackBar.open('reset todos', undefined, { duration: 1500 });
    }

    public get itemsOpen(): TodoItem[] | undefined {
        return this.filterCheckedBy(false);
    }

    public get itemsDone(): TodoItem[] | undefined {
        return this.filterCheckedBy(true);
    }

    public onChecked(checked: boolean, item: TodoItem) {
        item.checked = checked;
        item.lastModified = new Date();
        this.snackBar.open('checked / unchecked item', undefined, { duration: 1500 });
    }

    private filterCheckedBy(checked: boolean): TodoItem[] | undefined {
        if (this.todos) {
            return this.todos.filter((item) => item.checked === checked);
        }

        return undefined;
    }
}
