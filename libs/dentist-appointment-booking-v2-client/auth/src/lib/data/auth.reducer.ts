import { createReducer, on } from '@ngrx/store';
import { fetchUserProfileSuccess, signInSuccess, signOutSuccess } from './auth.actions';
import { AuthState } from '../domain/state';

const initialState: AuthState = {};

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state, { tokens }) => ({
    ...state,
    token: tokens.token,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken
  })),
  on(signOutSuccess, (state) => ({
    ...state,
    token: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    profile: undefined
  })),
  on(fetchUserProfileSuccess, (state, { profile }) => ({
    ...state,
    profile
  }))
);
