import { createReducer, on } from '@ngrx/store';
import {
  fetchUserPhotoSuccess,
  fetchUserProfileSuccess,
  refreshTokens,
  signInSuccess,
  signOutSuccess
} from './auth.actions';
import { AuthState, UserProfile } from '../domain/state';

const initialState: AuthState = {};

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state, { tokens }) => ({
    ...state,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    identityToken: tokens.identityToken
  })),
  on(signOutSuccess, (state) => ({
    ...state,
    accessToken: undefined,
    refreshToken: undefined,
    identityToken: undefined,
    profile: undefined
  })),
  on(fetchUserProfileSuccess, (state, { profile }) => ({
    ...state,
    profile
  })),
  on(refreshTokens, (state, { accessToken }) => ({
    ...state,
    accessToken
  })),
  on(fetchUserPhotoSuccess, (state, { photoUrl }) => ({
    ...state,
    profile: {
      ...(state.profile as UserProfile),
      photoUrl
    }
  }))
);
