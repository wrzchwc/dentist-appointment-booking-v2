import { ApplicationConfig, isDevMode } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { CredentialsInterceptor } from './shared/interceptors/credentials.interceptor';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActionReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import {
  AUTH_FEATURE_KEY,
  AuthEffects,
  authReducer
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/auth';
import { NavigationEffects } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/navigation';
import { localStorageSync } from 'ngrx-store-localstorage';

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [AUTH_FEATURE_KEY], rehydrate: true, removeOnUndefined: true })(reducer);
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true
    },
    provideRouter(APP_ROUTES),
    provideHttpClient(),
    provideAnimations(),
    provideStore(
      { [AUTH_FEATURE_KEY]: authReducer },
      { metaReducers: [localStorageSyncReducer] }
    ),
    provideStoreDevtools({ logOnly: !isDevMode(), maxAge: 25 }),
    provideEffects(AuthEffects, NavigationEffects)
  ]
};
