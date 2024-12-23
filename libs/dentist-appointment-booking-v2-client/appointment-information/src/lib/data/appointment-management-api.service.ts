import { Observable } from 'rxjs';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

export abstract class AppointmentManagementApiService {
  abstract getAppointment(appointmentId: string): Observable<AppointmentDAO>
}
