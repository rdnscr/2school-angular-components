import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cloneArray, TodoItem } from '../shared';
import { TodoService } from './services/todo.service';

@Component({
    selector: 'todo-view',
    templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
    private todos: TodoItem[] = [];
    private orig: TodoItem[] = [];

    constructor(private snackBar: MatSnackBar, private todoService: TodoService) {

    }

    public ngOnInit(): void {
        this.todoService.load().subscribe((result) => {
          this.orig = result;
          this.todos = cloneArray(result);
      });
    }

    public onAdded(newItem: TodoItem) {
      this.todos.push(newItem);
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
