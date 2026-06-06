import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import type { AuthRole } from '../../../core/auth/auth.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-sign-up-page',
  imports: [RouterLink],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly username = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly role = signal<AuthRole>('user');
  readonly errorMessage = signal<string | null>(null);

  updateUsername(value: string): void {
    this.username.set(value);
  }

  updateEmail(value: string): void {
    this.email.set(value);
  }

  updatePassword(value: string): void {
    this.password.set(value);
  }

  updateRole(value: string): void {
    this.role.set(value === 'admin' ? 'admin' : 'user');
  }

  async signUp(): Promise<void> {
    this.errorMessage.set(null);

    try {
      const user = await this.authService.signUp({
        username: this.username(),
        email: this.email(),
        password: this.password(),
        role: this.role(),
      });
      await this.router.navigateByUrl(user.role === 'admin' ? '/admin' : '/todos');
    } catch (error) {
      this.errorMessage.set(error instanceof Error ? error.message : 'Không thể đăng ký.');
    }
  }
}
