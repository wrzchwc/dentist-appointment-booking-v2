export interface SignUpRequest {
  readonly email: string;
  readonly password: string;
}

export interface ConfirmSignUpRequest {
  readonly email: string;
  readonly confirmationCode: string;
}

export interface SignInRequest {
  readonly email: string;
  readonly password: string;
}
