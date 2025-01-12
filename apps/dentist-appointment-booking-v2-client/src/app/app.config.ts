import { ApplicationConfig, isDevMode } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
  JwtInterceptor
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/auth';
import { NavigationEffects } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/navigation';
import { localStorageSync } from 'ngrx-store-localstorage';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  AppointmentBookingEffects
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-booking';
import {
  environment,
  ENVIRONMENT
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/environments';

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [AUTH_FEATURE_KEY], rehydrate: true, removeOnUndefined: true })(reducer);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideStore(
      { [AUTH_FEATURE_KEY]: authReducer },
      { metaReducers: [localStorageSyncReducer] }
    ),
    provideStoreDevtools({ logOnly: !isDevMode(), maxAge: 25 }),
    provideEffects(AuthEffects, NavigationEffects, AppointmentBookingEffects),
    provideNativeDateAdapter(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: ENVIRONMENT, useValue: environment }
  ]
};
