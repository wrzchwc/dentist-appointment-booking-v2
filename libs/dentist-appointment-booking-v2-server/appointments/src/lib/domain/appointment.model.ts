import { Treatment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/treatments';

export interface Appointment {
  readonly id: string;
  readonly startsAt: string;
  readonly userId: string;
  readonly treatments?: Treatment[];
  readonly healthReports: object[];
}
