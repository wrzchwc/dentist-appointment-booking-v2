import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  imports: [MatIconModule, MatButtonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentComponent {
  readonly appointmentId = input('');
  readonly startsAt = input(new Date().toISOString());

  readonly cancelAppointment = output();
  readonly rescheduleAppointment = output();

  readonly cancelable = computed(() =>
    DateTime.fromISO(this.startsAt()).diffNow().get('millisecond') >= 0
  )

  reschedule(): void {
    this.rescheduleAppointment.emit();
  }

  cancel(): void {
    this.cancelAppointment.emit();
  }
}
