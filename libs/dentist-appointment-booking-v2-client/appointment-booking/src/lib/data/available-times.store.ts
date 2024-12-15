import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

const baseUrl = '/api/appointment-booking/available-dates';

export const AvailableTimesStore = signalStore(
  withState(initialState),
  withMethods((store, httpClient = inject(HttpClient)) => ({
    fetchTimes: rxMethod<FetchAvailableTimes>(
      pipe(
        switchMap(({ date, length }) =>
          httpClient.get<string[]>(baseUrl, { params: { date, length } })
        ),
        tap((availableTimes) => patchState(store, { availableTimes }))
      )
    )
  }))
);
