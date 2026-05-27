import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';
import { TodoApiService } from '../../todos/services/todo-api.service';

@Component({
  selector: 'app-admin-dashboard-page',
  imports: [RouterLink],
  templateUrl: './admin-dashboard-page.html',
  styleUrl: './admin-dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardPage {
  private readonly authService = inject(AuthService);
  private readonly todoApi = inject(TodoApiService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly adminCount = this.authService.adminCount;
  readonly userCount = this.authService.userCount;
  readonly totalUsers = computed(() => this.authService.registeredUsers().length);
  readonly totalTodos = signal(0);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    if (this.isBrowser) {
      void this.loadTotals();
    }
  }

  async loadTotals(): Promise<void> {
    this.errorMessage.set(null);

    try {
      this.totalTodos.set((await this.todoApi.getTodos()).length);
    } catch {
      this.errorMessage.set('Không thể tải tổng số todo. Hãy kiểm tra JSON Server.');
    }
  }
}
