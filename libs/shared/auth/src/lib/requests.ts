export interface SignUpRequest {
  readonly email: string;
  readonly password: string;
}

export interface ConfirmSignUpRequest {
  readonly email: string;
  readonly confirmationCode: string;
  readonly userId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly photoUrl?: string;
}

export interface SignInRequest {
  readonly email: string;
  readonly password: string;
}

export interface RefreshTokenRequest {
  readonly refreshToken: string;
}
