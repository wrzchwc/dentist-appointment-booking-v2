import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientAppointmentService } from './client-appointment.service';
import { Appointment } from '../../model';

@Injectable({
    providedIn: 'root',
})
export class ClientAppointmentResolver  {
    constructor(private readonly clientAppointmentService: ClientAppointmentService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Appointment> {
        return this.clientAppointmentService.getAppointment(route.params['appointmentId']);
    }
}
