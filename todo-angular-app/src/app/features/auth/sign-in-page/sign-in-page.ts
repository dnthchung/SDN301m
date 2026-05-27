import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-sign-in-page',
  imports: [RouterLink],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly email = signal('');
  readonly password = signal('');
  readonly errorMessage = signal<string | null>(null);

  updateEmail(value: string): void {
    this.email.set(value);
  }

  updatePassword(value: string): void {
    this.password.set(value);
  }

  async signIn(): Promise<void> {
    this.errorMessage.set(null);

    try {
      const user = await this.authService.signIn({
        email: this.email(),
        password: this.password(),
      });
      await this.router.navigateByUrl(user.role === 'admin' ? '/admin' : '/todos');
    } catch (error) {
      this.errorMessage.set(error instanceof Error ? error.message : 'Không thể đăng nhập.');
    }
  }
}
