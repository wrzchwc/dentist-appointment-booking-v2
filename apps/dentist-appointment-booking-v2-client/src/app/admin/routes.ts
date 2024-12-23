import { Routes } from '@angular/router';
import { AdminAppointmentComponent } from './feature/admin-appointment/admin-appointment.component';
import { AdminAppointmentsComponent } from './feature/admin-appointments/admin-appointments.component';
import { AdminComponent } from './feature/admin/admin.component';
import { AdminResolver } from './feature/admin/admin.resolver';
import {
  AdminAppointmentManagementApiService as AdminAppointmentService,
  AppointmentManagementApiService as AppointmentService
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-information';
import {
  AdminAppointmentManagementApiService,
  AppointmentManagementApiService
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-listing';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'appointments',
    children: [
      {
        path: ':appointmentId',
        title: 'Podgląd wizyty',
        providers: [
          {
            provide: AppointmentService,
            useClass: AdminAppointmentService
          }
        ],
        component: AdminAppointmentComponent
      },
      {
        path: '',
        title: 'Wizyty',
        providers: [
          {
            provide: AppointmentManagementApiService,
            useClass: AdminAppointmentManagementApiService
          }
        ],
        component: AdminAppointmentsComponent
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    title: 'Rezerwacje',
    providers: [AdminAppointmentManagementApiService],
    resolve: { appointments: AdminResolver }
  }
];
