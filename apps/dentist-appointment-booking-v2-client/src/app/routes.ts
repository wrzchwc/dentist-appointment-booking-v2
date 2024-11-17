import { Routes } from '@angular/router';
import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { AppointmentPreviewClientService } from './appointment-preview/services/appointment-preview-client.service';
import { Route } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/navigation';
import { authGuard } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/auth';

export const APP_ROUTES: Routes = [
  {
    path: Route.APPOINTMENT_BOOKING,
    // canLoad: [AuthenticationGuard],
    loadChildren: async () => (await import('./appointment-booking/routes')).APPOINTMENT_BOOKING_ROUTES
  },
  {
    path: Route.CLIENT,
    canMatch: [authGuard],
    loadChildren: async () => (await import('./client/routes')).CLIENT_ROUTES
  },
  {
    path: Route.ADMIN,
    canLoad: [AuthenticationGuard],
    loadChildren: async () => (await import('./admin/routes')).ADMIN_ROUTES
  },
  {
    path: Route.APPOINTMENT_BOOKING,
    canLoad: [AuthenticationGuard],
    providers: [AppointmentPreviewClientService],
    loadChildren: async () => (await import('./appointment-preview/routes')).APPOINTMENT_PREVIEW_ROUTES
  },
  {
    path: Route.AUTH,
    loadChildren: async () => (await import('@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/auth')).AUTH_ROUTES
  },
  {
    path: Route.HOME,
    loadComponent: async () => (await import('./shared/components/page/home/home.component')).HomeComponent
  }
];
