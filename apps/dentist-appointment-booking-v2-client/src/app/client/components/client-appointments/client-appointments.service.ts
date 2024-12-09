import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { FetchAppointmentsResponse } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Injectable({
    providedIn: 'root',
})
export class ClientAppointmentsService {
    private readonly baseUrl: string = '/api/appointment-management';

    constructor(private readonly httpClient: HttpClient) {}

    getAppointments(date: Date): Observable<FetchAppointmentsResponse> {
        const dateTime: DateTime = DateTime.fromJSDate(date);

        return this.httpClient.get<FetchAppointmentsResponse>(this.baseUrl, {
            params: {
                after: dateTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toJSDate().toISOString(),
                before: dateTime.set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).toJSDate().toISOString(),
            },
        });
    }
}
