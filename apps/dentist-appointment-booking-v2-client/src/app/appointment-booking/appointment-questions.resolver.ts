import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AppointmentBookingService } from './appointment-booking/appointment-booking.service';
import {
  AppointmentQuestion
} from '@dentist-appointment-booking-v2/shared/appointment-booking';

@Injectable({
    providedIn: 'root',
})
export class AppointmentQuestionsResolver  {
    constructor(private readonly appointmentBookingService: AppointmentBookingService) {}

    resolve(): Observable<AppointmentQuestion[]> {
        return this.appointmentBookingService.getAppointmentQuestions();
    }
}
