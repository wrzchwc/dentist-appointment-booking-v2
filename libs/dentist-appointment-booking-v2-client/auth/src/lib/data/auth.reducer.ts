import { createReducer, on } from '@ngrx/store';
import { fetchUserProfileSuccess, refreshTokens, signInSuccess, signOutSuccess } from './auth.actions';
import { AuthState } from '../domain/state';

const initialState: AuthState = {};

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state, { tokens }) => ({
    ...state,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken
  })),
  on(signOutSuccess, (state) => ({
    ...state,
    accessToken: undefined,
    refreshToken: undefined,
    profile: undefined
  })),
  on(fetchUserProfileSuccess, (state, { profile }) => ({
    ...state,
    profile
  })),
  on(refreshTokens, (state, {accessToken}) => ({
    ...state,
    accessToken
  }))
);
