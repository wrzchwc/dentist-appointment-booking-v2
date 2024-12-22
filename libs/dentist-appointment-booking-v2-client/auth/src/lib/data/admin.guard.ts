import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { profile } from './auth.selectors';
import { Role } from '@dentist-appointment-booking-v2/shared/auth';

export function adminGuard(): boolean {
  const store = inject(Store);
  const userProfile = store.selectSignal(profile)
  return !!userProfile()?.roles?.some((role) => role === Role.ADMIN);
}
