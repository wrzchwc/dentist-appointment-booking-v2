import { Routes } from '@angular/router';
import { appointmentResolver } from './resolvers/appointment.resolver';
import { appointmentListTitleResolver } from './resolvers/appointment-list-title.resolver';
import { appointmentsAtDateResolver, upcomingAppointmentsResolver } from './resolvers/appointments.resolver';

export const APPOINTMENT_PREVIEW_ROUTES: Routes = [
    {
        path: ':appointmentId',
        title: 'Podgląd wizyty',
        resolve: { preview: appointmentResolver },
        loadComponent: async () =>
            (await import('./components/appointment-preview/appointment-preview.component'))
                .AppointmentPreviewComponent,
    },
    {
        path: 'list',
        title: appointmentListTitleResolver,
        resolve: { appointments: appointmentsAtDateResolver },
        loadComponent: async () =>
            (await import('./components/appointment-list/appointment-list.component')).AppointmentListComponent,
    },
    {
        path: '',
        title: 'Nadchodzące wizyty',
        resolve: { appointments: upcomingAppointmentsResolver },
        loadComponent: async () =>
            (await import('./components/landing-page/landing-page.component')).LandingPageComponent,
    },
];
