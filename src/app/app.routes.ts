import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { AboutComponent } from 'app/about';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  {
    path: 'todo-single-component',
    loadChildren: 'app/todo-single-component/todo.module#TodoSingleComponentModule',
    data: { title: 'Todo Single Component' }
  },
  { path: 'about', component: AboutComponent, data: { title: 'About' } },
  { path: '**', component: NoContentComponent },
];
