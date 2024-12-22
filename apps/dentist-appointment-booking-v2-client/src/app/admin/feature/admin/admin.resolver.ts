import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AdminAppointmentManagementApiService } from './admin-appointment-management-api.service';
import { DateService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/date';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Injectable({
    providedIn: 'root',
})
export class AdminResolver  {
    constructor(
      private readonly admin: AdminAppointmentManagementApiService,
      private readonly date: DateService
    ) {}

    resolve(): Observable<AppointmentDAO[]> {
        return this.admin.getAppointments(this.date.currentDay);
    }
}
