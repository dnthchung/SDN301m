import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';

import type {
  AuthSession,
  AuthRole,
  AuthUser,
  RegisteredUser,
  SignInRequest,
  SignUpRequest,
} from './auth.model';

const AUTH_SESSION_KEY = 'todo-angular-app.auth-session';
const AUTH_USERS_URL = 'http://localhost:3000/users';
const SESSION_DURATION_MS = 5 * 60 * 1000;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private sessionExpiryTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly _currentUser = signal<AuthUser | null>(null);
  private readonly _registeredUsers = signal<RegisteredUser[]>([]);

  readonly currentUser = this._currentUser.asReadonly();
  readonly registeredUsers = computed<AuthUser[]>(() =>
    this._registeredUsers().map((user) => this.toAuthUser(user)),
  );
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');
  readonly isUser = computed(() => this.currentUser()?.role === 'user');
  readonly userCount = computed(
    () => this.registeredUsers().filter((user) => user.role === 'user').length,
  );
  readonly adminCount = computed(
    () => this.registeredUsers().filter((user) => user.role === 'admin').length,
  );

  constructor() {
    this.restoreSession();

    if (this.isBrowser) {
      void this.loadUsers();
    }
  }

  async loadUsers(): Promise<void> {
    this._registeredUsers.set(await this.request<RegisteredUser[]>(''));
  }

  async signIn(request: SignInRequest): Promise<AuthUser> {
    const email = request.email.trim().toLowerCase();
    const password = request.password;
    const users = await this.request<RegisteredUser[]>(`?email=${encodeURIComponent(email)}`);
    const user = users.find(
      (registeredUser) => registeredUser.email === email && registeredUser.password === password,
    );

    if (!user) {
      throw new Error('Email hoặc mật khẩu không đúng.');
    }

    return this.startSession(user);
  }

  async signUp(request: SignUpRequest): Promise<AuthUser> {
    const username = request.username.trim();
    const email = request.email.trim().toLowerCase();
    const password = request.password;
    const role = request.role;

    if (!username || !email || !password) {
      throw new Error('Vui lòng nhập đầy đủ username, email và mật khẩu.');
    }

    const registeredUsers = await this.request<RegisteredUser[]>(
      `?email=${encodeURIComponent(email)}`,
    );

    if (registeredUsers.length > 0) {
      throw new Error('Email này đã được đăng ký.');
    }

    const registeredUser = await this.request<RegisteredUser>('', {
      method: 'POST',
      body: JSON.stringify({
        id: crypto.randomUUID(),
        username,
        email,
        role,
        password,
        createdAt: new Date().toISOString(),
      } satisfies RegisteredUser),
    });

    this._registeredUsers.update((users) => [...users, registeredUser]);

    return this.startSession(registeredUser);
  }

  async updateUserRole(userId: string, role: AuthRole): Promise<void> {
    const updatedUser = await this.request<RegisteredUser>(`/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });

    this._registeredUsers.update((users) =>
      users.map((user) => (user.id === userId ? updatedUser : user)),
    );

    if (this.currentUser()?.id === userId) {
      this.startSession({ ...this.currentUser()!, role });
    }
  }

  async removeUser(userId: string): Promise<void> {
    await this.request<void>(`/${userId}`, {
      method: 'DELETE',
    });

    this._registeredUsers.update((users) => users.filter((user) => user.id !== userId));

    if (this.currentUser()?.id === userId) {
      this.signOut();
    }
  }

  signOut(): void {
    this.clearExpiryTimer();
    this._currentUser.set(null);

    if (this.isBrowser) {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    }
  }

  private restoreSession(): void {
    if (!this.isBrowser) {
      return;
    }

    const session = this.readSession();

    if (!session) {
      return;
    }

    if (Date.now() >= session.expiresAt) {
      this.signOut();
      return;
    }

    this._currentUser.set(session.user);
    this.scheduleSessionExpiry(session.expiresAt);
  }

  private startSession(user: AuthUser): AuthUser {
    const authUser = this.toAuthUser(user);
    const session: AuthSession = {
      user: authUser,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    };

    this._currentUser.set(authUser);

    if (this.isBrowser) {
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
      this.scheduleSessionExpiry(session.expiresAt);
    }

    return authUser;
  }

  private scheduleSessionExpiry(expiresAt: number): void {
    this.clearExpiryTimer();

    if (!this.isBrowser) {
      return;
    }

    this.sessionExpiryTimer = setTimeout(
      () => {
        this.signOut();
      },
      Math.max(expiresAt - Date.now(), 0),
    );
  }

  private clearExpiryTimer(): void {
    if (this.sessionExpiryTimer) {
      clearTimeout(this.sessionExpiryTimer);
      this.sessionExpiryTimer = null;
    }
  }

  private readSession(): AuthSession | null {
    const rawSession = sessionStorage.getItem(AUTH_SESSION_KEY);

    if (!rawSession) {
      return null;
    }

    try {
      return JSON.parse(rawSession) as AuthSession;
    } catch {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
      return null;
    }
  }

  private toAuthUser(user: AuthUser): AuthUser {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(`${AUTH_USERS_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Auth API request failed: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }
}
