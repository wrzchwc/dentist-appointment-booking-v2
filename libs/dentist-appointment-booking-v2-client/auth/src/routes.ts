import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-in',
        title: 'Logowanie',
        loadComponent: async () =>
          (await import('./lib/feature/sign-in-page.component')).SignInPageComponent
      },
      {
        path: 'sign-up',
        title: 'Rejestracja',
        loadComponent: async () =>
          (await import('./lib/feature/sign-up-page.component')).SignUpPageComponent
      }
    ]
  }
];
