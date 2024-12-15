import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AppointmentPreviewClientService } from '../services/appointment-preview-client.service';
import { DateService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/date';
import { Appointment } from '../model';

export function appointmentsAtDateResolver(): Observable<Appointment[]> {
    return inject(AppointmentPreviewClientService).getAppointmentsAt(inject(DateService).currentWorkday);
}

export function upcomingAppointmentsResolver(): Observable<Appointment[]> {
    return inject(AppointmentPreviewClientService).getUpcomingAppointments(new Date());
}
