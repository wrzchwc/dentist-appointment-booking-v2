import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Injectable({
    providedIn: 'root',
})
export class AdminAppointmentManagementApiService {
    private readonly baseUrl: string = '/api/appointment-management';

    constructor(private readonly httpClient: HttpClient) {}

    getAppointments(after: Date): Observable<AppointmentDAO[]> {
        return this.httpClient.get<AppointmentDAO[]>(this.baseUrl, {
            params: {
                after: after.toISOString(),
                before: DateTime.fromJSDate(after)
                    .set({ hour: 17, minute: 0, second: 0, millisecond: 0 })
                    .toJSDate()
                    .toISOString(),
            },
        });
    }
}
