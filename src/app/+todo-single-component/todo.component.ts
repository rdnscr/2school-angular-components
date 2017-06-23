import { cloneArray } from '../state/utils';
import { TodoItem } from '../common';
import { Component, Inject, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['todo.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
    private todoItems: TodoItem[];
    private originalItems: TodoItem[];

    @ViewChild('description') private descriptionInput: ElementRef;

    constructor(private http: Http, private snackBar: MdSnackBar) {

    }

    public ngOnInit() {
        this.http.get('assets/mock-data/todos.json')
            .map((result) => result.json())
            .subscribe((result) => {
                this.originalItems = result;
                this.todoItems = cloneArray(result);
            });
    }

    public ngOnDestroy() {
    }

    public onAdd(newItemDescription: string) {
        const newItem = { description: newItemDescription, checked: false, lastModified: new Date(), id: 0 };
        this.descriptionInput.nativeElement.value = '';
        this.displaySnackbarMessage(`Item with description "${newItemDescription} added`);
        this.todoItems.push(newItem);
    }

    public onReset(): void {
        this.todoItems = cloneArray(this.originalItems);
        this.displaySnackbarMessage('reset todos');
    }

    public get itemsOpen(): TodoItem[] {
        return this.filterCheckedBy(false);
    }

    public get itemsDone(): TodoItem[] {
        return this.filterCheckedBy(true);
    }

    public onChecked(checked: boolean, item: TodoItem) {
        item.checked = checked;
        item.lastModified = new Date();
        let snackbarMessage = item.checked ? `'${item.description}' was finished` : `'${item.description}' was moved to todo list`;
        this.displaySnackbarMessage(snackbarMessage);
    }

    private filterCheckedBy(checked: boolean): TodoItem[] {
        if (this.todoItems) {
            return this.todoItems.filter((item) => item.checked === checked);
        }
        return undefined;
    }

    private displaySnackbarMessage = (message: string) => 
      this.snackBar.open(message, null, { duration: 1500 });
}
