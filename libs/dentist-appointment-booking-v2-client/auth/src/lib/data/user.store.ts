import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { SignUpRequest } from '@dentist-appointment-booking-v2/shared/auth';
import { pipe, switchMap, tap } from 'rxjs';

interface State {
  readonly userId: string | undefined;
}

const initialState: State = {
  userId: undefined
};

export const UserStore = signalStore(
  withState(initialState),
  withMethods((
      store,
      authApiService = inject(AuthApiService)
    ) => ({
      signUp: rxMethod<SignUpRequest>(
        pipe(
          switchMap((request) => authApiService.signUp(request)),
          tap(({ userId }) => patchState(store, { userId }))
        )
      )
    })
  )
);
