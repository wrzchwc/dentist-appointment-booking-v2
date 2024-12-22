import { Treatment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/treatments';
import { User } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/users';

export interface Appointment {
  readonly id: string;
  readonly startsAt: Date;
  readonly userId: string | User;
  readonly treatments?: Treatment[];
  readonly healthReports: object[];
}
