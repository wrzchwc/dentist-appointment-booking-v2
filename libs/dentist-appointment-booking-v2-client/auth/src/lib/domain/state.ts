import { FetchUserProfileResponse } from '@dentist-appointment-booking-v2/shared/auth';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  readonly token?: string;
  readonly accessToken?: string;
  readonly refreshToken?: string;
  readonly profile?: FetchUserProfileResponse
}
