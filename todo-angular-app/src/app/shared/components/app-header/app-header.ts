import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly currentUser = this.authService.currentUser;
  readonly navItems = computed(() => {
    const currentUser = this.currentUser();

    if (!currentUser) {
      return [{ label: 'Home', path: '/', exact: true }];
    }

    if (currentUser.role === 'admin') {
      return [
        { label: 'Dashboard', path: '/admin', exact: true },
        { label: 'Users', path: '/users', exact: true },
      ];
    }

    return [{ label: 'Todo', path: '/todos', exact: true }];
  });

  async signOut(): Promise<void> {
    this.authService.signOut();
    await this.router.navigateByUrl('/sign-in');
  }
}
