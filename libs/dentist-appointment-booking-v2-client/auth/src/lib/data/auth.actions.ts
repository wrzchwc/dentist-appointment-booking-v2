import { createAction, props } from '@ngrx/store';
import {
  UserProfile,
  SignInRequest,
  SignInResponse,
  ConfirmSignUpRequest
} from '@dentist-appointment-booking-v2/shared/auth';

export const signIn = createAction(
  '[Auth] Sign In]', props<{ readonly request: SignInRequest }>()
);

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ readonly tokens: SignInResponse; }>()
);

export const signOut = createAction('[Auth] Sign Out]');

export const signOutSuccess = createAction('[Auth] Sign Out Success]');

export const fetchUserProfileSuccess = createAction(
  '[Auth] Fetch User Profile Success',
  props<{ readonly profile: UserProfile }>()
);

export const refreshTokens = createAction(
  '[Auth] Refresh Tokens',
  props<{ accessToken: string }>()
);

export const confirmSignUp = createAction(
  '[Auth] Confirm Sign Up]',
  props<{ readonly request: ConfirmSignUpRequest }>()
);
