import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { navigateToPage } from './navigation.actions';
import { exhaustMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class NavigationEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);

  readonly navigateToPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateToPage),
        exhaustMap(({ route }) => this.router.navigate([route]))
      ),
    {
      dispatch: false
    }
  );
}
