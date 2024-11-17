import { createReducer, on } from '@ngrx/store';
import { signInSuccess, signOutSuccess } from './auth.actions';
import { AuthState } from '../domain/state';

const initialState: AuthState = {
  isAuthenticated: false
}

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state, {tokens}) => ({
    ...state,
    isAuthenticated: true,
    token: tokens.token,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken
  })),
  on(signOutSuccess, (state) => ({
    ...state,
    isAuthenticated: false,
    token: undefined,
    accessToken: undefined,
    refreshToken: undefined
  }))
);
