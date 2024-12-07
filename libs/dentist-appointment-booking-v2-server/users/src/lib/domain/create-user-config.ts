export interface CreateUserConfig {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly photoUrl: string | undefined;
}
