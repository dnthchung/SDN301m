import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Todo Angular App',
    loadComponent: () =>
      import('./features/todos/todo-page/todo-page').then((component) => component.TodoPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
