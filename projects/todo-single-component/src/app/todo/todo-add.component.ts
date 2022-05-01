import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoItem } from '../shared';

@Component({
  selector: 'todo-add',
  templateUrl: 'todo-add.component.html',
})
export class TodoAddComponent {
  @Output()
  public added = new EventEmitter<TodoItem>();

  @ViewChild('description', { static: true }) private descriptionInput: ElementRef | undefined;

  constructor(private snackBar: MatSnackBar) {}

  public onAdd(newItemDescription: string): void {
    const newItem = { description: newItemDescription, checked: false, lastModified: new Date(), id: 0 };

    if(this.descriptionInput){
      this.descriptionInput.nativeElement.value = '';
    }

    this.snackBar.open(`Item with description "${newItemDescription} added`, undefined, { duration: 1500 });
    this.added.emit(newItem);
    this.snackBar.open('add item', undefined, { duration: 1500 });

}
}
