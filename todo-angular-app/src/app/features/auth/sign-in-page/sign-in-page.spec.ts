import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

import { SignInPage } from './sign-in-page';

describe('SignInPage', () => {
  let component: SignInPage;
  let fixture: ComponentFixture<SignInPage>;
  let authServiceMock: {
    signIn: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    authServiceMock = {
      signIn: vi.fn(async () => ({
        id: 'u-1',
        username: 'Learner',
        email: 'learner@example.com',
        role: 'user',
      })),
    };

    await TestBed.configureTestingModule({
      imports: [SignInPage],
      providers: [provideRouter([]), { provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render sign in form', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Sign in');
    expect(compiled.querySelector<HTMLInputElement>('input[type="email"]')).toBeTruthy();
    expect(compiled.querySelector<HTMLInputElement>('input[type="password"]')).toBeTruthy();
  });
});
