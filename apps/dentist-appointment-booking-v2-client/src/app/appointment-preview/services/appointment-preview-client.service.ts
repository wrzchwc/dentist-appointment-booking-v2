import { Injectable } from '@angular/core';
import { iif, Observable } from 'rxjs';
import { AppointmentUrlService } from '../../shared/services/appointment-url.service';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';
import { Appointment, AppointmentPreview } from '../model';
import { DAY_END, DAY_START, WORKDAY_END } from './model';
import { AuthenticationService } from '../../shared';

@Injectable()
export class AppointmentPreviewClientService {
    constructor(
        private readonly appointmentUrlService: AppointmentUrlService,
        private readonly httpClient: HttpClient,
        private readonly authenticationService: AuthenticationService
    ) {}

    getAppointment(appointmentId: string): Observable<AppointmentPreview> {
        const baseUrl = this.appointmentUrlService.getBaseUrl(this.authenticationService.isAdmin);
        return this.httpClient.get<AppointmentPreview>(`${baseUrl}/${appointmentId}`);
    }

    getAppointmentsAt(date: Date): Observable<Appointment[]> {
        const url = this.appointmentUrlService.getBaseUrl(this.authenticationService.isAdmin);
        const dateTime: DateTime = DateTime.fromJSDate(date);
        return this.httpClient.get<Appointment[]>(url, {
            params: {
                after: dateTime.set(DAY_START).toJSDate().toISOString(),
                before: dateTime.set(DAY_END).toJSDate().toISOString(),
            },
        });
    }

    getUpcomingAppointments(startDate: Date): Observable<Appointment[]> {
        const url: string = this.appointmentUrlService.getBaseUrl(this.authenticationService.isAdmin);
        return iif(
            () => !!this.authenticationService.profile?.isAdmin,
            this.foo(startDate, url),
            this.baz(startDate, url)
        );
    }

    private foo(startDate: Date, url: string): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(url, {
            params: {
                after: startDate.toISOString(),
            },
        });
    }

    private baz(startDate: Date, url: string): Observable<Appointment[]> {
        return this.httpClient.get<Appointment[]>(url, {
            params: {
                after: startDate.toISOString(),
                before: DateTime.fromJSDate(startDate).set(WORKDAY_END).toJSDate().toISOString(),
            },
        });
    }
}
