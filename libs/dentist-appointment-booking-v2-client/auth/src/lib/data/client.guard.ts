import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { profile } from './auth.selectors';

export function clientGuard(): boolean {
  const store = inject(Store);
  const userProfile = store.selectSignal(profile)
  return !userProfile()?.roles?.length
}
