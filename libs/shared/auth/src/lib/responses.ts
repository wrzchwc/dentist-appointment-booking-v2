export interface SignUpResponse {
  readonly userId: string;
}

export interface SignInResponse {
  readonly token: string;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface UserProfile {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly photoUrl: string | null;
}

export interface RefreshTokenResponse {
  readonly token: string;
  readonly accessToken: string;
}
