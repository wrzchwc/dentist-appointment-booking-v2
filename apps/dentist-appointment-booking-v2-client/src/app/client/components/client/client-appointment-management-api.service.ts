import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Injectable({
  providedIn: 'root'
})
export class ClientAppointmentManagementApiService {
  private readonly baseUrl: string = '/api/appointment-management';

  private readonly httpClient = inject(HttpClient);

  getAppointments(after: Date): Observable<AppointmentDAO[]> {
    return this.httpClient.get<AppointmentDAO[]>(
      this.baseUrl,
      { params: { after: after.toISOString() } }
    );
  }
}
