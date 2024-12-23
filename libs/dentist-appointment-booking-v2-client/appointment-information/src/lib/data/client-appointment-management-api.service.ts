import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { AppointmentManagementApiService } from './appointment-management-api.service';

@Injectable()
export class ClientAppointmentManagementApiService extends AppointmentManagementApiService {
  private readonly baseUrl: string = '/api/appointment-management';

  private readonly httpClient = inject(HttpClient);

  getAppointment(appointmentId: string): Observable<AppointmentDAO> {
    return this.httpClient.get<AppointmentDAO>(`${this.baseUrl}/${appointmentId}`);
  }
}
