import { inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cancelAppointment, rescheduleAppointment } from './appointment-booking.actions';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, tap } from 'rxjs';
import { UpdateStartDateComponent } from '../feature/update-start-date.component';
import { UpdateStartDateData, UpdateStartDateDialogData } from '../domain/update-start-date';
import { AppointmentBookingApiService } from './appointment-booking-api.service';

@Injectable()
export class AppointmentBookingEffects {
  private readonly actions$ = inject(Actions);
  private readonly matDialog = inject(MatDialog);
  private readonly location = inject(Location);
  private readonly appointmentBookingApiService = inject(AppointmentBookingApiService);

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
        this.appointmentBookingApiService.rescheduleAppointment(data.id, data.startsAt)
      ),
      tap(() => this.location.back())
    ), { dispatch: false }
  );

  // readonly cancelAppointment$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(cancelAppointment),
  //     switchMap()
  //   )
  // );
}
