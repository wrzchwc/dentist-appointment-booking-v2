import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated } from './auth.selectors';
import {
  navigateToPage,
  Route
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/navigation';

export function authGuard(): boolean {
  const store = inject(Store);

  if (store.selectSignal(isAuthenticated)()){
    return true;
  }

  store.dispatch(navigateToPage({ route: Route.HOME }));
  return true;
}
