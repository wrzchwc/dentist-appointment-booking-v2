import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AppointmentBookingApiService } from './appointment-booking-api.service';

interface State {
  readonly availableTimes: string[];
}

const initialState: State = {
  availableTimes: []
};

interface FetchAvailableTimes {
  readonly date: string;
  readonly length: number;
}

export const AvailableTimesStore = signalStore(
  withState(initialState),
  withMethods((store, appointmentBookingApiService = inject(AppointmentBookingApiService)) => ({
    fetchTimes: rxMethod<FetchAvailableTimes>(
      pipe(
        switchMap(({ date, length }) =>
          appointmentBookingApiService.getAvailableTimes(date, length)
        ),
        tap((availableTimes) => patchState(store, { availableTimes }))
      )
    )
  }))
);
