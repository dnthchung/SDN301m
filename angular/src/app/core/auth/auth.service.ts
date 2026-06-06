import { Injectable, computed, signal } from '@angular/core';

import { STORAGE_KEYS } from '../../commons/constants';

export interface User {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userState = signal<User | null>(this.readStoredUser());

  readonly user = this.userState.asReadonly();
  readonly isAuthenticated = computed(() => this.userState() !== null);

  login(name: string): void {
    const user = { name: name.trim() || 'TaskFlow User' };
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
    this.userState.set(user);
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    this.userState.set(null);
  }

  private readStoredUser(): User | null {
    const rawUser = localStorage.getItem(STORAGE_KEYS.currentUser);
    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as User;
    } catch {
      localStorage.removeItem(STORAGE_KEYS.currentUser);
      return null;
    }
  }
}
