import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_ROUTES } from './routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActionReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import {
  AUTH_FEATURE_KEY,
  AuthEffects,
  authReducer,
  jwtInterceptor
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/auth';
import { NavigationEffects } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/navigation';
import { localStorageSync } from 'ngrx-store-localstorage';
import { provideNativeDateAdapter } from '@angular/material/core';

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [AUTH_FEATURE_KEY], rehydrate: true, removeOnUndefined: true })(reducer);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAnimations(),
    provideStore(
      { [AUTH_FEATURE_KEY]: authReducer },
      { metaReducers: [localStorageSyncReducer] }
    ),
    provideStoreDevtools({ logOnly: !isDevMode(), maxAge: 25 }),
    provideEffects(AuthEffects, NavigationEffects),
    provideNativeDateAdapter()
  ]
};
