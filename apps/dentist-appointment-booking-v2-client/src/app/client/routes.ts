import { Routes } from '@angular/router';
import { ClientAppointmentComponent } from './components/client-appointment/client-appointment.component';
import { ClientAppointmentsComponent } from './components/client-appointments/client-appointments.component';
import { ClientComponent } from './components/client/client.component';
import { ClientResolver } from './components/client/client.resolver';

export const CLIENT_ROUTES: Routes = [
    {
        path: 'appointments',
        children: [
            {
                path: ':appointmentId',
                title: 'Podgląd wizyty',
                component: ClientAppointmentComponent,
            },
            {
                path: '',
                title: 'Moje wizyty',
                component: ClientAppointmentsComponent,
            },
        ],
    },
    {
        path: '',
        component: ClientComponent,
        title: 'Nadchodzące wizyty',
        resolve: { appointments: ClientResolver },
    },
];
