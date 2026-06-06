export type AuthRole = 'admin' | 'user';

export interface AuthUser {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly role: AuthRole;
}

export interface RegisteredUser extends AuthUser {
  readonly password: string;
  readonly createdAt: string;
}

export interface AuthSession {
  readonly user: AuthUser;
  readonly expiresAt: number;
}

export interface SignInRequest {
  readonly email: string;
  readonly password: string;
}

export interface SignUpRequest extends SignInRequest {
  readonly username: string;
  readonly role: AuthRole;
}
