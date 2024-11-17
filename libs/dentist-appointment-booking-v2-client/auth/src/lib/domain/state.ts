export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  readonly isAuthenticated: boolean;
  readonly token?: string;
  readonly accessToken?: string;
  readonly refreshToken?: string;
}
