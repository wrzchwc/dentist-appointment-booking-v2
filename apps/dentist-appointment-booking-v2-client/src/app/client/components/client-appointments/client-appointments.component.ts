import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { ClientAppointmentsService } from './client-appointments.service';
import { Subject, takeUntil } from 'rxjs';
import { AppointmentsComponent } from '../../../shared';
import { Appointment } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppointmentsComponent],
  standalone: true
})
export class ClientAppointmentsComponent implements OnDestroy {
  @Input() appointments: Appointment[] = [];

  private readonly destroy$: Subject<void> = new Subject();

  constructor(
    private readonly clientAppointmentsService: ClientAppointmentsService
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleDateChange(date: Date): void {
    this.clientAppointmentsService
      .getAppointments(date)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        // todo: fix this
        this.appointments = [];
      });
  }
}
