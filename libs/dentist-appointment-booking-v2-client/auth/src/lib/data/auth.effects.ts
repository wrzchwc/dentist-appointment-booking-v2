import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './auth.service';
import { signIn, signInSuccess, signOut, signOutSuccess } from './auth.actions';
import { filter, map, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { accessToken } from './auth.selectors';
import {
  navigateToPage,
  Route
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/navigation';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly store = inject(Store);

  readonly signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      switchMap(({ request }) => this.authService.signIn(request)),
      map((response) => signInSuccess({ tokens: response }))
    )
  );

  readonly signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInSuccess),
      map(({tokens}) => tokens.accessToken),
      switchMap((accessToken) => this.authService.getCurrentUserProfile(accessToken)),
      map(() => navigateToPage({route: Route.CLIENT}))
    )
  );

  readonly signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      withLatestFrom(this.store.select(accessToken)),
      map(([, accessToken]) => accessToken),
      filter(Boolean),
      switchMap((accessToken) => this.authService.signOut(accessToken)),
      filter((response) => response === 'SUCCESS'),
      map(() => signOutSuccess())
    )
  );

  readonly signOutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOutSuccess),
      map(() => navigateToPage({ route: Route.HOME }))
    )
  );
}
