import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

import { SignUpPage } from './sign-up-page';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;
  let authServiceMock: {
    signUp: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    authServiceMock = {
      signUp: vi.fn(async () => ({
        id: 'u-1',
        username: 'Learner',
        email: 'learner@example.com',
        role: 'user',
      })),
    };

    await TestBed.configureTestingModule({
      imports: [SignUpPage],
      providers: [provideRouter([]), { provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render sign up form', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Sign up');
    expect(compiled.querySelector<HTMLInputElement>('#username')).toBeTruthy();
    expect(compiled.querySelector<HTMLSelectElement>('#role')).toBeTruthy();
    expect(compiled.querySelector<HTMLInputElement>('input[type="email"]')).toBeTruthy();
    expect(compiled.querySelector<HTMLInputElement>('input[type="password"]')).toBeTruthy();
  });
});
