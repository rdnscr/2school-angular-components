import { Route } from '@angular/router';
import { TodoComponent } from './todo.component';

export default [
  {
      path: '',
      children: [
          { path: '', component: TodoComponent },
      ]
  },
] satisfies Route[];
