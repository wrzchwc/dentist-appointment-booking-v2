import { createAction, props } from '@ngrx/store';
import { Route } from '../domain/route';

export const navigateToPage = createAction(
  '[Navigation] Navigate to Page',
  props<{ readonly route: Route }>()
);
