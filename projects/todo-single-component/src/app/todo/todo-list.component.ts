import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoItem } from '../shared';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoViewComponent {
  @Input()
  public items: TodoItem[] | undefined;

  @Input()
  public title: string | undefined;

  constructor(private snackBar: MatSnackBar) {}

  public onChecked(checked: boolean, item: TodoItem): void {
    item.checked = checked;
    item.lastModified = new Date();
    this.snackBar.open('checked / unchecked item', undefined, { duration: 1500 });
}
}
