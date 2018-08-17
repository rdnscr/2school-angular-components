import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
  {
    path: 'todo',
    loadChildren: './todo/todo.module#TodoSingleComponentModule',
    data: { title: 'Single Component' }
  }
];
