import { Routes } from '@angular/router';

export const PRICE_LIST_ROUTES: Routes = [
  {
    path: '',
    title: 'Cennik',
    loadComponent: async () =>
      (await import('./lib/feature/price-list.component')).PriceListComponent
  }
];
