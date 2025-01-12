import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { AppointmentManagementApiService } from './appointment-management-api.service';
import { ENVIRONMENT } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/environments';

@Injectable()
export class AdminAppointmentManagementApiService extends AppointmentManagementApiService {
  private readonly baseUrl = `${inject(ENVIRONMENT).apiUrl}/api/appointment-management/admin`;

  private readonly httpClient = inject(HttpClient);

  getAppointment(appointmentId: string): Observable<AppointmentDAO> {
    return this.httpClient.get<AppointmentDAO>(`${this.baseUrl}/${appointmentId}`);
  }
}
