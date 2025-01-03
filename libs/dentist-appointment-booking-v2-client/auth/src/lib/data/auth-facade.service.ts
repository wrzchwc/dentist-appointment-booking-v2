import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { signOut } from './auth.actions';
import {isAuthenticated, profile} from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  private readonly store = inject(Store);

  readonly isAuthenticated = this.store.selectSignal(isAuthenticated);
  readonly userProfile = this.store.selectSignal(profile);

  signOut() {
    this.store.dispatch(signOut());
  }
}
