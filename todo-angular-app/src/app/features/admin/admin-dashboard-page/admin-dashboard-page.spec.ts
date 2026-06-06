import { ComponentFixture, TestBed } from '@angular/core/testing';
import { computed, signal } from '@angular/core';
import { provideRouter } from '@angular/router';

import type { AuthUser } from '../../../core/auth/auth.model';
import { AuthService } from '../../../core/auth/auth.service';
import { TodoApiService } from '../../todos/services/todo-api.service';
import { AdminDashboardPage } from './admin-dashboard-page';

describe('AdminDashboardPage', () => {
  let component: AdminDashboardPage;
  let fixture: ComponentFixture<AdminDashboardPage>;

  beforeEach(async () => {
    const users = signal<AuthUser[]>([
      { id: 'u-1', username: 'Admin One', email: 'admin@example.com', role: 'admin' },
      { id: 'u-2', username: 'User One', email: 'user@example.com', role: 'user' },
    ]);

    await TestBed.configureTestingModule({
      imports: [AdminDashboardPage],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            registeredUsers: computed(() => users()),
            adminCount: computed(() => 1),
            userCount: computed(() => 1),
          },
        },
        {
          provide: TodoApiService,
          useValue: {
            getTodos: vi.fn(async () => [
              {
                id: 't-1',
                ownerId: 'u-2',
                title: 'Todo',
                completed: false,
                createdAt: '2026-05-27T03:00:00.000Z',
              },
            ]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render system totals', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('System overview');
    expect(compiled.textContent).toContain('Total users');
    expect(compiled.textContent).toContain('Total todos');
  });
});
