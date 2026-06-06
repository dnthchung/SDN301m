import type { TRoute } from './types';

// Route metadata for navigation and guards.
// Angular Router config stays in app.routes.ts because it owns lazy loading and guard wiring.

export const taskFlowPublicRoutes: Array<TRoute> = [
  {
    title: 'Login',
    link: '/login',
    icon: 'login',
  },
];

export const taskFlowRoutes: Array<TRoute> = [
  {
    title: 'Task Board',
    link: '/board',
    icon: 'view_kanban',
    requiresAuth: true,
  },
  {
    title: 'Task Detail',
    link: '/tasks/:id',
    icon: 'assignment',
    requiresAuth: true,
  },
  {
    title: 'Notifications',
    link: '/notifications',
    icon: 'notifications',
    requiresAuth: true,
  },
];

export const taskFlowNavigationRoutes: Array<TRoute> = taskFlowRoutes.filter(
  (route) => !route.link.includes(':'),
);

export const protectedRoutePaths = taskFlowRoutes
  .filter((route) => route.requiresAuth)
  .map((route) => route.link);

export const exceptionRoutes = ['/login', '/404'];

export const defaultRoutes = taskFlowNavigationRoutes;
