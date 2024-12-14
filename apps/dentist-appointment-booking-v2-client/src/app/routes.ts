import { Routes } from '@angular/router';
import { Route} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/navigation';
import { AUTH_ROUTES, authGuard } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/auth';

export const APP_ROUTES: Routes = [
  {
    path: Route.APPOINTMENT_BOOKING,
    canMatch: [authGuard],
    loadChildren: async () => (await import('./appointment-booking/routes')).APPOINTMENT_BOOKING_ROUTES
  },
  {
    path: Route.CLIENT,
    canMatch: [authGuard],
    loadChildren: async () => (await import('./client/routes')).CLIENT_ROUTES
  },
  {
    path: Route.ADMIN,
    canMatch: [authGuard],
    loadChildren: async () => (await import('./admin/routes')).ADMIN_ROUTES
  },
  {
    path: Route.AUTH,
    children: AUTH_ROUTES
  },
  {
    path: Route.HOME,
    title: 'Dentist Appointment Booking',
    loadComponent: async () => (await import('./shared/components/page/home/home.component')).HomeComponent
  }
];
