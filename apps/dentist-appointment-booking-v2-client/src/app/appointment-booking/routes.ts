import { Routes } from '@angular/router';
import { AppointmentQuestionsResolver } from './appointment-questions.resolver';
import {
  ServicesResolver
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-booking';

export const APPOINTMENT_BOOKING_ROUTES: Routes = [
    {
        path: '',
        title: 'Rezerwacja wizyty',
        resolve: { services: ServicesResolver, appointmentQuestions: AppointmentQuestionsResolver },
        loadComponent: async () =>
            (await import('./appointment-booking/appointment-booking.component')).AppointmentBookingComponent,
    },
];
