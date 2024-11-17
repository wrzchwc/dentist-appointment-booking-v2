import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './auth.service';
import { fetchUserProfileSuccess, signIn, signInSuccess, signOut, signOutSuccess } from './auth.actions';
import { filter, map, switchMap } from 'rxjs';
import {
  navigateToPage,
  Route
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/navigation';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);

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
      switchMap(() => this.authService.getCurrentUserProfile()),
      map((profile) => fetchUserProfileSuccess({ profile }))
    )
  );

  readonly fetchUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUserProfileSuccess),
      map(() => navigateToPage({ route: Route.CLIENT }))
    )
  );

  readonly signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      switchMap(() => this.authService.signOut()),
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
