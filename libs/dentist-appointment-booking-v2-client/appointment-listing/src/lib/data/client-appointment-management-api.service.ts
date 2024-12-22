import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { AppointmentManagementApiService } from './appointment-management-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAppointmentManagementApiService extends AppointmentManagementApiService {
  private readonly baseUrl: string = '/api/appointment-management';

  private readonly httpClient = inject(HttpClient);

  getAppointments(date: Date): Observable<AppointmentDAO[]> {
    const dateTime: DateTime = DateTime.fromJSDate(date);

    return this.httpClient.get<AppointmentDAO[]>(this.baseUrl, {
      params: {
        after: dateTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toJSDate().toISOString(),
        before: dateTime.set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).toJSDate().toISOString()
      }
    });
  }
}
