import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AdminAppointmentsService } from './admin-appointments.service';
import { DateService } from '../../../../shared/services/date.service';
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
