import { Routes } from '@angular/router';
import { ClientAppointmentComponent } from './feature/client-appointment/client-appointment.component';
import { ClientAppointmentsComponent } from './feature/client-appointments/client-appointments.component';
import { ClientComponent } from './feature/client/client.component';
import { ClientResolver } from './feature/client/client.resolver';
import {
  AppointmentManagementApiService,
  ClientAppointmentManagementApiService
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-listing';
import {
  AppointmentManagementApiService as AppointmentService,
  ClientAppointmentManagementApiService as ClientAppointmentService
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-information';

export const CLIENT_ROUTES: Routes = [
  {
    path: 'appointments',
    children: [
      {
        path: ':appointmentId',
        title: 'Podgląd wizyty',
        providers: [
          {
            provide: AppointmentService,
            useClass: ClientAppointmentService
          }
        ],
        component: ClientAppointmentComponent
      },
      {
        path: '',
        title: 'Moje wizyty',
        providers: [
          {
            provide: AppointmentManagementApiService,
            useClass: ClientAppointmentManagementApiService
          }
        ],
        component: ClientAppointmentsComponent
      }
    ]
  },
  {
    path: '',
    component: ClientComponent,
    title: 'Nadchodzące wizyty',
    resolve: { appointments: ClientResolver }
  }
];
