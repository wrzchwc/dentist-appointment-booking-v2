import { inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { rescheduleAppointment } from './appointment-booking.actions';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, tap } from 'rxjs';
import { UpdateStartDateComponent } from '../feature/update-start-date.component';
import { UpdateStartDateService } from './update-start-date.service';
import { UpdateStartDateData, UpdateStartDateDialogData } from '../domain/update-start-date';

@Injectable()
export class AppointmentBookingEffects {
  private readonly actions$ = inject(Actions);
  private readonly matDialog = inject(MatDialog);
  private readonly location = inject(Location);
  private readonly updateStartDateService = inject(UpdateStartDateService);

  readonly rescheduleAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rescheduleAppointment),
      switchMap(({ id, length, startsAt }) =>
        this.matDialog.open<
          UpdateStartDateComponent,
          UpdateStartDateDialogData,
          UpdateStartDateData | undefined
        >(UpdateStartDateComponent, { data: { id, length, startsAt } }).afterClosed()
      ),
      filter(Boolean),
      switchMap((data) =>
        this.updateStartDateService.rescheduleAppointment(data.id, data.startsAt)
      ),
      tap(() => this.location.back())
    ), { dispatch: false }
  );
}
