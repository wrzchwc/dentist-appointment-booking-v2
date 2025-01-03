import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiService } from './auth-api.service';
import {
  confirmSignUp,
  fetchUserProfileSuccess,
  signIn,
  signInSuccess,
  signOut,
  signOutSuccess
} from './auth.actions';
import { filter, map, switchMap } from 'rxjs';
import {
  navigateToPage,
  Route
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/navigation';
import { isAdmin } from '@dentist-appointment-booking-v2/shared/auth';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authApiService = inject(AuthApiService);

  readonly signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      switchMap(({ request }) => this.authApiService.signIn(request)),
      map((response) => signInSuccess({ tokens: response }))
    )
  );

  readonly signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInSuccess),
      switchMap(() => this.authApiService.getCurrentUserProfile()),
      map((profile) => fetchUserProfileSuccess({ profile }))
    )
  );

  readonly fetchUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUserProfileSuccess),
      map(({profile}) => isAdmin(profile.roles)),
      map((isAdmin) => isAdmin ? Route.ADMIN : Route.CLIENT),
      map((route) => navigateToPage({ route }))
    )
  );

  readonly signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      switchMap(() => this.authApiService.signOut()),
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

  readonly confirmSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmSignUp),
      switchMap(({request}) => this.authApiService.confirmSignUp(request)),
      map(() => navigateToPage({ route: Route.SIGN_IN }))
    )
  )
}
