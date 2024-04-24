import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: "", redirectTo: "todo", pathMatch: "full" },
  {
    path: "todo",
    loadChildren: () => import("./todo/todo.routes"),
    data: { title: "Single Component" },
  },
];
