import { createAction, props } from '@ngrx/store';
import { Route } from '../domain/route';

interface NavigateToPage {
  readonly route: Route;
}

export const navigateToPage = createAction(
  '[Navigation] Navigate to Page',
  props<NavigateToPage>()
);
