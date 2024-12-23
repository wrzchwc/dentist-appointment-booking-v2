import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppointmentManagementApiService } from './appointment-management-api.service';
import { AppointmentLengthCalculator } from './appointment-length-calculator.service';
import { DataSourceFactory } from './data-source-factory.service';

interface State {
  readonly appointment: AppointmentDAO | undefined;
}

const initialState: State = { appointment: undefined };

export const AppointmentStore = signalStore(
  withState(initialState),
  withComputed((
    store,
    appointmentLengthCalculator = inject(AppointmentLengthCalculator),
    dataSourceFactory = inject(DataSourceFactory),
  ) => ({
    dataSource: computed(() => dataSourceFactory.create(store.appointment()?.treatments || [])),
    length: computed(() => appointmentLengthCalculator.calculateLength(store.appointment()?.treatments || [])),
  })),
  withMethods((
    store,
    appointmentManagementApiService = inject(AppointmentManagementApiService),
  ) => ({
    _fetchAppointment: rxMethod<string>(
      pipe(
        switchMap((appointmentId) => appointmentManagementApiService.getAppointment(appointmentId)),
        tap(appointment => patchState(store, { appointment })),
      )
    )
  })),
  withHooks({
    onInit(store) {
      store._fetchAppointment(inject(ActivatedRoute).snapshot.params['appointmentId']);
    }
  })
);
