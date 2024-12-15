import { createAction, props } from '@ngrx/store';

export const rescheduleAppointment = createAction(
  '[Appointment Booking] Reschedule Appointment',
  props<{
    readonly id: string,
    readonly length: number,
    readonly startsAt: string
  }>()
);

export const cancelAppointment = createAction(
  '[Appointment Booking] Cancel Appointment',
  props<{ readonly appointmentId: string }>()
);
