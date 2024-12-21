export interface SignUpResponse {
  readonly userId: string;
}

export interface SignInResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface UserProfile {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly photoUrl: string | null;
  readonly groups?: string [];
}

export interface RefreshTokenResponse {
  readonly accessToken: string;
}
