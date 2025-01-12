import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { AppointmentManagementApiService } from './appointment-management-api.service';
import { ENVIRONMENT } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/environments';

@Injectable({ providedIn: 'root' })
export class AdminAppointmentManagementApiService extends AppointmentManagementApiService {
  private readonly baseUrl = `${inject(ENVIRONMENT).apiUrl}/api/appointment-management/admin`;

  private readonly httpClient = inject(HttpClient);

  getAppointments(after: Date): Observable<AppointmentDAO[]> {
    return this.httpClient.get<AppointmentDAO[]>(this.baseUrl, {
      params: {
        after: after.toISOString(),
        before: DateTime.fromJSDate(after)
          .set({ hour: 17, minute: 0, second: 0, millisecond: 0 })
          .toJSDate()
          .toISOString()
      }
    });
  }
}
