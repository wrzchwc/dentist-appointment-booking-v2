import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FetchAppointmentsResponse } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Injectable({
    providedIn: 'root',
})
export class ClientAppointmentManagementApiService {
    private readonly baseUrl: string = '/api/appointment-management';

    constructor(private readonly httpClient: HttpClient) {}

    getAppointments(after: Date): Observable<FetchAppointmentsResponse> {
        return this.httpClient.get<FetchAppointmentsResponse>(this.baseUrl, { params: { after: after.toISOString() } });
    }
}
