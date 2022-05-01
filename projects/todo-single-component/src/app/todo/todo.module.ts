import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodoAddComponent } from './todo-add.component';
import { TodoViewComponent } from './todo-list.component';
import { TodoComponent } from './todo.component';
import { todoRoutesModule } from './todo.routes';

@NgModule({
    imports: [SharedModule,
        todoRoutesModule],
    declarations: [TodoComponent, TodoAddComponent, TodoViewComponent],
})
export class TodoSingleComponentModule {

}
