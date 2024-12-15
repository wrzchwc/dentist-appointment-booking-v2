import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AdminAppointmentsService } from './admin-appointments.service';
import { DateService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/date';
import { AdminAppointmentPreview } from '../../../../shared';

@Injectable({
    providedIn: 'root',
})
export class AdminAppointmentsResolver  {
    constructor(private readonly appointments: AdminAppointmentsService, private readonly date: DateService) {}

    resolve(): Observable<AdminAppointmentPreview[]> {
        return this.appointments.getAppointments(this.date.currentWorkday);
    }
}
