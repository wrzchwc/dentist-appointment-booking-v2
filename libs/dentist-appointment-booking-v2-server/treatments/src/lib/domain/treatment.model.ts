import { Service } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/services';

export interface Treatment {
  readonly id: string;
  readonly quantity: number;
  readonly appointmentId: string;
  readonly serviceId: string | Service | null;
}
