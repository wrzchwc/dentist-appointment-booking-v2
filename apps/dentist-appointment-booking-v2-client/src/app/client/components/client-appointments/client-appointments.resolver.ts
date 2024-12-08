import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ClientAppointmentsService } from './client-appointments.service';
import { DateService } from '../../../shared/services/date.service';
import { Appointment } from '../../model';

@Injectable({
    providedIn: 'root',
})
export class ClientAppointmentsResolver  {
    constructor(
        private readonly clientAppointmentsService: ClientAppointmentsService,
        private readonly dateService: DateService
    ) {}

    resolve(): Observable<Appointment[]> {
        // return this.clientAppointmentsService.getAppointments(this.dateService.currentWorkday);
      return of([]);
    }
}
