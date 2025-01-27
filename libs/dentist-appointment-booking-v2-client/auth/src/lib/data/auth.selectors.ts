import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from '../domain/state';

const selectFeature = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const isAuthenticated = createSelector(
  selectFeature,
  (state) => !!state.accessToken && !!state.profile
);

export const accessToken = createSelector(
  selectFeature,
  (state) => state.accessToken
);

export const identityToken = createSelector(
  selectFeature,
  (state) => state.identityToken
);

export const refreshToken = createSelector(
  selectFeature,
  (state) => state.refreshToken
);

export const profile = createSelector(
  selectFeature,
  (state) => state.profile
);
