import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

import type { AuthUser } from '../../../core/auth/auth.model';
import { AuthService } from '../../../core/auth/auth.service';
import { AppHeader } from './app-header';

describe('AppHeader', () => {
  let component: AppHeader;
  let fixture: ComponentFixture<AppHeader>;
  let currentUser: ReturnType<typeof signal<AuthUser | null>>;

  beforeEach(async () => {
    currentUser = signal<AuthUser | null>(null);

    await TestBed.configureTestingModule({
      imports: [AppHeader],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            currentUser,
            signOut: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render primary navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('.nav a'));

    expect(links.map((link) => link.textContent?.trim())).toEqual(['Home']);
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['/']);
  });

  it('should render auth links when user is not signed in', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.auth-actions')?.textContent).toContain('Sign up');
    expect(compiled.querySelector('.auth-actions')?.textContent).toContain('Sign in');
  });

  it('should render username when user is signed in', () => {
    currentUser.set({
      id: 'u-1',
      username: 'ChungDT',
      email: 'chungdt@example.com',
      role: 'admin',
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.auth-actions')?.textContent).toContain('ChungDT');
    expect(compiled.querySelector('.auth-actions')?.textContent).toContain('Sign out');
  });
});
