import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './auth.service';
import type { AuthRole } from './auth.model';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated() ? true : router.createUrlTree(['/sign-in']);
};

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const allowedRoles = (route.data['roles'] ?? []) as AuthRole[];
  const currentRole = authService.currentUser()?.role;

  if (!currentRole) {
    return router.createUrlTree(['/sign-in']);
  }

  return allowedRoles.includes(currentRole) ? true : router.createUrlTree(['/']);
};
