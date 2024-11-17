import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-in',
        loadComponent: async () =>
          (await import('./lib/feature/sign-in-page.component')).SignInPageComponent
      },
      {
        path: 'sign-up',
        loadComponent: async () =>
          (await import('./lib/feature/sign-up-page.component')).SignUpPageComponent
      }
    ]
  }
];
