import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { AppointmentsComponent } from '../../../shared';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import {
  AppointmentsStore
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-listing';

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppointmentsComponent],
  standalone: true,
  providers: [AppointmentsStore]
})
export class ClientAppointmentsComponent {
  private readonly appointmentsStore = inject(AppointmentsStore);

  readonly appointments: Signal<AppointmentDAO[]> = this.appointmentsStore.appointments;

  handleDateChange(date: Date): void {
    this.appointmentsStore.fetchAppointments(date);
  }
}
