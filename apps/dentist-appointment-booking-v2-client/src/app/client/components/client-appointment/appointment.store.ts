import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { ClientAppointmentService } from './client-appointment.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { DataService } from '../../../appointment-preview/components/appointment-preview/data.service';
import { ActivatedRoute } from '@angular/router';

interface State {
  readonly appointment: AppointmentDAO | undefined;
}

const initialState: State = { appointment: undefined };

export const AppointmentStore = signalStore(
  withState(initialState),
  withComputed((store, dataService = inject(DataService)) => ({
    dataSource: computed(() => dataService.createDateSource(store.appointment()?.treatments || [])),
    length: computed(() => dataService.calculateLength(store.appointment()?.treatments || [])),
  })),
  withMethods((
    store,
    clientAppointmentService = inject(ClientAppointmentService)
  ) => ({
    _fetchAppointment: rxMethod<string>(
      pipe(
        switchMap((appointmentId) => clientAppointmentService.getAppointment(appointmentId)),
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
