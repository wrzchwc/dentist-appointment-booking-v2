import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/date';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { AppointmentPreviewComponent } from '../../ui/appointment-preview/appointment-preview.component';
import { MatInputModule } from '@angular/material/input';
import { AppointmentsListComponent } from '../appointments-list/appointments-list.component';
import { AppointmentsWrapperComponent } from '../appointments-wrapper/appointments-wrapper.component';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgIf,
    AppointmentPreviewComponent,
    NgForOf,
    DatePipe,
    MatInputModule,
    AppointmentsListComponent,
    AppointmentsWrapperComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentsComponent implements OnInit {
  readonly listTitle = input('');
  readonly appointments = input<AppointmentDAO[]>([]);

  readonly dateChange = output<Date>({});

  private readonly formBuilder = inject(FormBuilder);
  private readonly dateService = inject(DateService);
  private readonly destroyRef = inject(DestroyRef);

  readonly pickerControl: FormControl<Date> = this.formBuilder.control(this.dateService.currentWorkday, {
    nonNullable: true
  });

  ngOnInit(): void {
    this.pickerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((date) => {
      this.dateChange.emit(date);
    });
  }
}
