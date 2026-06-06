import { ComponentFixture, TestBed } from '@angular/core/testing';
import { computed, signal } from '@angular/core';

import type { AuthUser } from '../../../core/auth/auth.model';
import { AuthService } from '../../../core/auth/auth.service';
import { UsersPage } from './users-page';

describe('UsersPage', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;
  let users: ReturnType<typeof signal<AuthUser[]>>;

  beforeEach(async () => {
    users = signal<AuthUser[]>([
      { id: 'u-1', username: 'Admin One', email: 'admin@example.com', role: 'admin' },
      { id: 'u-2', username: 'User One', email: 'user1@example.com', role: 'user' },
      { id: 'u-3', username: 'User Two', email: 'user2@example.com', role: 'user' },
    ]);

    await TestBed.configureTestingModule({
      imports: [UsersPage],
      providers: [
        {
          provide: AuthService,
          useValue: {
            currentUser: signal<AuthUser | null>(users()[0]),
            registeredUsers: computed(() => users()),
            adminCount: computed(() => users().filter((user) => user.role === 'admin').length),
            userCount: computed(() => users().filter((user) => user.role === 'user').length),
            updateUserRole: vi.fn(async () => undefined),
            removeUser: vi.fn(async () => undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user management rows', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('User management');
    expect(compiled.querySelectorAll('.table-row:not(.table-row--head)')).toHaveLength(3);
  });

  it('should filter users by role', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const userFilter = Array.from(
      compiled.querySelectorAll<HTMLButtonElement>('.role-filter button'),
    ).find((button) => button.textContent?.includes('user'));

    expect(userFilter).toBeTruthy();

    userFilter!.click();
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.table-row:not(.table-row--head)')).toHaveLength(2);
    expect(compiled.textContent).toContain('User One');
  });
});
