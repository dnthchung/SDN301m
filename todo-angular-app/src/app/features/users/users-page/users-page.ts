import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import type { AuthRole } from '../../../core/auth/auth.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-users-page',
  imports: [],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage {
  private readonly authService = inject(AuthService);

  readonly roleOptions: ReadonlyArray<AuthRole | 'All'> = ['All', 'admin', 'user'];
  readonly searchTerm = signal('');
  readonly selectedRole = signal<AuthRole | 'All'>('All');
  readonly currentUser = this.authService.currentUser;

  readonly users = this.authService.registeredUsers;
  readonly adminCount = this.authService.adminCount;
  readonly userCount = this.authService.userCount;
  readonly filteredUsers = computed(() => {
    const searchTerm = this.searchTerm().trim().toLowerCase();
    const selectedRole = this.selectedRole();

    return this.users().filter((user) => {
      const matchesSearch =
        !searchTerm ||
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm);
      const matchesRole = selectedRole === 'All' || user.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  });

  updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  selectRole(role: AuthRole | 'All'): void {
    this.selectedRole.set(role);
  }

  async updateUserRole(userId: string, role: AuthRole): Promise<void> {
    await this.authService.updateUserRole(userId, role);
  }

  async removeUser(userId: string): Promise<void> {
    await this.authService.removeUser(userId);
  }
}
