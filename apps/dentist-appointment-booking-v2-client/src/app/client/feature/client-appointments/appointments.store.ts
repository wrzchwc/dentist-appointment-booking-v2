import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { ClientAppointmentsService } from './client-appointments.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { DateService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/date';

interface State {
  readonly appointments: AppointmentDAO[];
}

const initialState: State = {
  appointments: []
};

export const AppointmentsStore = signalStore(
  withState(initialState),
  withMethods((store, clientAppointmentsService = inject(ClientAppointmentsService)) => ({
    fetchAppointments: rxMethod<Date>(
      pipe(
        switchMap((date) => clientAppointmentsService.getAppointments(date)),
        tap(appointments => patchState(store, { appointments })),
      )
    )
  })),
  withHooks({
    onInit(store) {
      store.fetchAppointments(inject(DateService).currentWorkday);
    }
  }),
)
