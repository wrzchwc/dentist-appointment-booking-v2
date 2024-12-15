import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Injectable({
  providedIn: 'root'
})
export class ClientAppointmentService {
  private readonly baseUrl: string = '/api/appointment-management';

  private readonly httpClient = inject(HttpClient);

  getAppointment(appointmentId: string): Observable<AppointmentDAO> {
    return this.httpClient.get<AppointmentDAO>(`${this.baseUrl}/${appointmentId}`);
  }
}
