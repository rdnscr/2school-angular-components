import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  {
    path: 'todo-single-component',
    loadChildren: './+todo-single-component#TodoSingleComponentModule',
    data: { title: 'Todo Single Component' }
  },
  { path: '**', component: NoContentComponent },
];
