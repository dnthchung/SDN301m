import { Routes } from '@angular/router';

import { authGuard, roleGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Home | Todo Angular App',
    loadComponent: () =>
      import('./features/home/home-page/home-page').then((component) => component.HomePage),
  },
  {
    path: 'todos',
    title: 'Todos | Todo Angular App',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['user'] },
    loadComponent: () =>
      import('./features/todos/todo-page/todo-page').then((component) => component.TodoPage),
  },
  {
    path: 'admin',
    title: 'Admin | Todo Angular App',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] },
    loadComponent: () =>
      import('./features/admin/admin-dashboard-page/admin-dashboard-page').then(
        (component) => component.AdminDashboardPage,
      ),
  },
  {
    path: 'users',
    title: 'Users | Todo Angular App',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] },
    loadComponent: () =>
      import('./features/users/users-page/users-page').then((component) => component.UsersPage),
  },
  {
    path: 'sign-in',
    title: 'Sign in | Todo Angular App',
    loadComponent: () =>
      import('./features/auth/sign-in-page/sign-in-page').then((component) => component.SignInPage),
  },
  {
    path: 'sign-up',
    title: 'Sign up | Todo Angular App',
    loadComponent: () =>
      import('./features/auth/sign-up-page/sign-up-page').then((component) => component.SignUpPage),
  },
  {
    path: '**',
    title: '404 | Todo Angular App',
    loadComponent: () =>
      import('./features/not-found/not-found-page/not-found-page').then(
        (component) => component.NotFoundPage,
      ),
  },
];
