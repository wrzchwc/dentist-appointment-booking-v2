import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DateService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/date';
import { UpdateStartDateData, UpdateStartDateDialogData } from '../domain/update-start-date';
import { AvailableTimesStore } from '../data/available-times.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateTime } from 'luxon';

@Component({
  selector: 'lib-update-start-date',
  templateUrl: './update-start-date.component.html',
  styleUrls: ['./update-start-date.component.scss'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    DatePipe,
    MatInputModule,
    MatButtonModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AvailableTimesStore]
})
export class UpdateStartDateComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogData: UpdateStartDateDialogData = inject(MAT_DIALOG_DATA);
  private readonly dateService = inject(DateService);
  private readonly availableTimesStore = inject(AvailableTimesStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogRef = inject(MatDialogRef<UpdateStartDateComponent>);

  readonly formGroup = this.formBuilder.group({
    dateControl: this.formBuilder.nonNullable.control<Date>(DateTime.fromISO(this.dialogData.startsAt).toJSDate()),
    timeControl: this.formBuilder.nonNullable.control(this.dialogData.startsAt)
  });

  readonly availableTimes: Signal<string[]> = this.availableTimesStore.availableTimes;
  readonly min = this.dateService.currentDay.toISOString().slice(0, 10);


  ngOnInit(): void {
    this.availableTimesStore.fetchTimes({length: this.dialogData.length, date: this.dialogData.startsAt});
    this.formGroup.controls['dateControl'].valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((date) => {
      this.availableTimesStore.fetchTimes({
        date: date.toISOString(),
        length: this.dialogData.length
      })
    });
  }

  reschedule(): void {
    const data: UpdateStartDateData = {
      id: this.dialogData.id,
      startsAt: this.formGroup.controls['timeControl'].value
    };

    this.dialogRef.close(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
