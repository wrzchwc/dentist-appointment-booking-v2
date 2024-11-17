import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment1 } from '../../../../shared';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AdminAppointmentService {
    private readonly baseUrl = `${environment.apiUrl}/api/appointments`;

    constructor(private readonly client: HttpClient) {}

    getAppointment(appointmentId: string): Observable<Appointment1> {
        return this.client.get<Appointment1>(`${this.baseUrl}/${appointmentId}`);
    }

    cancelAppointment(appointmentId: string): Observable<string> {
        return this.client.delete(`${this.baseUrl}/${appointmentId}`, { responseType: 'text' });
    }
}
