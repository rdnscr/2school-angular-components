import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cloneArray, TodoItem } from '../shared';

@Component({
    selector: 'todo-view',
    templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
    private todos: TodoItem[] = [];
    private orig: TodoItem[] = [];

    @ViewChild('description', { static: true }) private descriptionInput: ElementRef | undefined;

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {

    }

    public ngOnInit(): void {
        this.http.get<TodoItem[]>('assets/mock-data/todos.json')
            .subscribe((result) => {
                this.orig = result;
                this.todos = cloneArray(result);
            });
    }

    public onAdd(newItemDescription: string): void {
        const newItem = { description: newItemDescription, checked: false, lastModified: new Date(), id: 0 };

        if(this.descriptionInput){
          this.descriptionInput.nativeElement.value = '';
        }

        this.snackBar.open(`Item with description "${newItemDescription} added`, undefined, { duration: 1500 });
        this.todos.push(newItem);
        this.snackBar.open('add item', undefined, { duration: 1500 });

    }

    public onReset(): void {
        this.todos = cloneArray(this.orig);
        this.snackBar.open('reset todos', undefined, { duration: 1500 });
    }

    public get itemsOpen(): TodoItem[] | undefined {
        return this.filterCheckedBy(false);
    }

    public get itemsDone(): TodoItem[] | undefined {
        return this.filterCheckedBy(true);
    }

    public onChecked(checked: boolean, item: TodoItem): void {
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
