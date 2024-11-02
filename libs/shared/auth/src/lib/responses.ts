export interface SignUpResponse {
  readonly userId: string;
}

export interface SignInResponse {
  readonly token: string;
  readonly accessToken: string;
  readonly refreshToken: string;
}
