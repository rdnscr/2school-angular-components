import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodoComponent } from './todo.component';
import { todoRoutesModule } from './todo.routes';

@NgModule({
    imports: [SharedModule,
        todoRoutesModule],
    declarations: [TodoComponent],
})
export class TodoSingleComponentModule {

}
