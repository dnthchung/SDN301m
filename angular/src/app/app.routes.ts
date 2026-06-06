import { Routes } from '@angular/router';

import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'board',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'board',
    canActivate: [authGuard],
    loadComponent: () => import('./features/task-board/task-board.component').then((m) => m.TaskBoardComponent),
  },
  {
    path: '**',
    redirectTo: 'board',
  },
];
