import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AdminAppointmentsService } from './admin-appointments.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AppointmentsComponent } from '../../../../shared';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Component({
  selector: 'app-admin-appointments',
  templateUrl: './admin-appointments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppointmentsComponent],
  standalone: true
})
export class AdminAppointmentsComponent implements OnDestroy {
  appointments: AppointmentDAO[] = this.route.snapshot.data['appointments'];

  private readonly destroy$: Subject<void> = new Subject();

  constructor(private readonly route: ActivatedRoute, private readonly service: AdminAppointmentsService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAppointmentsAt(date: Date) {
    this.service
      .getAppointments(date)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        // todo: fix this
        this.appointments = [];
      });
  }
}
