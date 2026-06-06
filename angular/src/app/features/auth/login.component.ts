import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule],
  template: `
    <section class="login-page">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>TaskFlow</mat-card-title>
          <mat-card-subtitle>Fake login for the RxJS learning board</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="submit()">
            <mat-form-field appearance="outline">
              <mat-label>Your name</mat-label>
              <mat-icon matPrefix>person</mat-icon>
              <input matInput formControlName="name" autocomplete="name" />
              @if (form.controls.name.hasError('required')) {
                <mat-error>Name is required</mat-error>
              }
            </mat-form-field>

            <button mat-flat-button type="submit" [disabled]="form.invalid">Enter board</button>
          </form>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: `
    .login-page {
      align-items: center;
      display: flex;
      justify-content: center;
      min-height: calc(100vh - 64px);
      padding: 1rem;
    }

    .login-card {
      border-radius: 8px;
      max-width: 420px;
      width: 100%;
    }

    form {
      display: grid;
      gap: 1rem;
      padding-top: 1.25rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.login(this.form.controls.name.value);
    void this.router.navigate(['/board']);
  }
}
