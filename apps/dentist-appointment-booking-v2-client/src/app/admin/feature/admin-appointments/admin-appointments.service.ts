import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { AdminAppointmentPreview } from '../../../shared';

@Injectable({
    providedIn: 'root',
})
export class AdminAppointmentsService {
    private readonly baseUrl = '/api/appointment-management';

    constructor(private readonly client: HttpClient) {}

    getAppointments(date: Date): Observable<AdminAppointmentPreview[]> {
        const dateTime: DateTime = DateTime.fromJSDate(date);

        return this.client.get<AdminAppointmentPreview[]>(this.baseUrl, {
            params: {
                after: dateTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toJSDate().toISOString(),
                before: dateTime.set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).toJSDate().toISOString(),
            },
        });
    }
}
