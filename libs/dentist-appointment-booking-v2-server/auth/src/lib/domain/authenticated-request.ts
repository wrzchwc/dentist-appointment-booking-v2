import { Role } from '@dentist-appointment-booking-v2/shared/auth';

export interface AuthenticatedRequest {
  readonly userId: string;
  readonly roles?: Role[];
}
