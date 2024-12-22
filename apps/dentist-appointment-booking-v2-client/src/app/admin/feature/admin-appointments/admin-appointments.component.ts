import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { AppointmentsComponent } from '../../../shared';
import {
  AppointmentsStore
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-listing';

@Component({
  selector: 'app-admin-appointments',
  templateUrl: './admin-appointments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppointmentsComponent],
  standalone: true,
  providers: [AppointmentsStore]
})
export class AdminAppointmentsComponent {
  private readonly appointmentsStore = inject(AppointmentsStore);

  readonly appointments: Signal<AppointmentDAO[]> = this.appointmentsStore.appointments;

  handleDateChange(date: Date): void {
    this.appointmentsStore.fetchAppointments(date);
  }
}
