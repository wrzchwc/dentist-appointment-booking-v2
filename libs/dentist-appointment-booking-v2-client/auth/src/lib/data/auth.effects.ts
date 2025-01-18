import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiService } from './auth-api.service';
import {
  confirmSignUp, confirmSignUpSuccess, fetchUserPhotoFailure, fetchUserPhotoSuccess,
  fetchUserProfileSuccess,
  signIn,
  signInSuccess,
  signOut,
  signOutSuccess
} from './auth.actions';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import {
  navigateToPage,
  Route
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/navigation';
import { isAdmin } from '@dentist-appointment-booking-v2/shared/auth';
import { PhotosApiService } from '@dentist-appointment-booking/dentist-appointment-booking-v2-client/photos';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authApiService = inject(AuthApiService);
  private readonly photosApiService = inject(PhotosApiService);

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
      map(({ profile }) => isAdmin(profile.roles)),
      map((isAdmin) => isAdmin ? Route.ADMIN : Route.CLIENT),
      map((route) => navigateToPage({ route }))
    )
  );

  readonly fetchUserPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUserProfileSuccess),
      map(({ profile }) => profile.id),
      switchMap((key) => this.photosApiService.getPhotoUrl(key)),
      map((photoUrl) => fetchUserPhotoSuccess({ photoUrl })),
      catchError(() => of(fetchUserPhotoFailure()))
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
      switchMap(({ request, photo }) =>
        this.authApiService.confirmSignUp(request).pipe(
          map(() => confirmSignUpSuccess({ userId: request.userId, photo }))
        )
      )
    )
  );

  readonly navigateToSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmSignUpSuccess),
      map(() => navigateToPage({ route: Route.SIGN_IN }))
    )
  );

  readonly uploadPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmSignUpSuccess),
      filter(({ photo }) => !!photo),
      filter(({ photo }) =>
        (photo as File).type === 'image/jpg' || (photo as File).type === 'image/jpeg'
      ),
      switchMap(({ userId, photo }) => this.photosApiService.uploadPhoto(userId, photo as File))
    ), { dispatch: false }
  );
}
