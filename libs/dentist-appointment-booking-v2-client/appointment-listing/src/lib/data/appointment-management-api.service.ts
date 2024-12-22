import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { Observable } from 'rxjs';

export abstract class AppointmentManagementApiService {
  abstract getAppointments(date: Date): Observable<AppointmentDAO[]>;
}
