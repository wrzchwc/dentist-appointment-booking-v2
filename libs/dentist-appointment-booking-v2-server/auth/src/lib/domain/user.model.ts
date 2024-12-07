import { Appointment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';

export interface User {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly photoUrl: string | null;
  readonly appointments: Appointment
}
