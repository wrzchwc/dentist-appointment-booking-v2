import { UserProfile as UserProfileDAO } from '@dentist-appointment-booking-v2/shared/auth';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  readonly token?: string;
  readonly accessToken?: string;
  readonly refreshToken?: string;
  readonly identityToken?: string;
  readonly profile?: UserProfile;
}

export interface UserProfile extends UserProfileDAO {
  readonly photoUrl?: string;
}
