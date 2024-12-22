import { Routes } from '@angular/router';
import { AdminAppointmentResolver } from './feature/admin-appointment/admin-appointment.resolver';
import { AdminAppointmentComponent } from './feature/admin-appointment/admin-appointment.component';
import { AdminAppointmentsResolver } from './feature/admin-appointments/admin-appointments.resolver';
import { AdminAppointmentsComponent } from './feature/admin-appointments/admin-appointments.component';
import { AdminComponent } from './feature/admin/admin.component';
import { AdminResolver } from './feature/admin/admin.resolver';

export const ADMIN_ROUTES: Routes = [
    {
        path: 'appointments',
        children: [
            {
                path: ':appointmentId',
                title: 'Podgląd wizyty',
                resolve: { appointment: AdminAppointmentResolver },
                component: AdminAppointmentComponent,
            },
            {
                path: '',
                title: 'Wizyty',
                resolve: { appointments: AdminAppointmentsResolver },
                component: AdminAppointmentsComponent,
            },
        ],
    },
    { path: '', component: AdminComponent, title: 'Rezerwacje', resolve: { appointments: AdminResolver } },
];
