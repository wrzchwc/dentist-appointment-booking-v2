import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AppointmentBookingService } from './appointment-booking/appointment-booking.service';
import { AppointmentQuestion } from './model';

@Injectable({
    providedIn: 'root',
})
export class AppointmentQuestionsResolver  {
    constructor(private readonly booking: AppointmentBookingService) {}

    resolve(): Observable<AppointmentQuestion[]> {
        return this.booking.getAppointmentQuestions();
    }
}
