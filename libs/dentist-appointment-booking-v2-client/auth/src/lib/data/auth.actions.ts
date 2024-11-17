import { createAction, props } from '@ngrx/store';
import { FetchUserProfileResponse, SignInRequest, SignInResponse } from '@dentist-appointment-booking-v2/shared/auth';

interface SignIn {
  readonly request: SignInRequest;
}

export const signIn = createAction(
  '[Auth] Sign In]', props<SignIn>()
);

interface SignInSuccess {
  readonly tokens: SignInResponse;
}

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<SignInSuccess>()
);

export const signOut = createAction('[Auth] Sign Out]');

export const signOutSuccess = createAction('[Auth] Sign Out Success]');

interface FetchUserProfileSuccess {
  readonly profile: FetchUserProfileResponse
}

export const fetchUserProfileSuccess = createAction(
  '[Auth] Fetch User Profile Success',
  props<FetchUserProfileSuccess>()
);
