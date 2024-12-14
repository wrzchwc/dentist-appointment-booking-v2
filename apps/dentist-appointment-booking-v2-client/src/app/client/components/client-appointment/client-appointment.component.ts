import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ClientAppointmentService } from './client-appointment.service';
import { DatePipe, Location } from '@angular/common';
import {
  AppointmentComponent,
  CardComponent,
  ServicesTableComponent,
  PricePipe,
  NamedPriceItem
} from '../../../shared';
import { EndDatePipe } from '../../../appointment-preview/components/appointment-preview/end-date.pipe';
import { AppointmentStore } from './appointment.store';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Component({
  selector: 'app-client-appointment',
  templateUrl: './client-appointment.component.html',
  styleUrls: ['../../../shared/components/page/appointment/appointment.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppointmentComponent, CardComponent, ServicesTableComponent, DatePipe, PricePipe, EndDatePipe],
  standalone: true,
  providers: [AppointmentStore]
})
export class ClientAppointmentComponent {
  private readonly appointmentStore = inject(AppointmentStore);

  readonly appointment: Signal<AppointmentDAO | undefined> = this.appointmentStore.appointment;
  readonly dataSource: Signal<NamedPriceItem[]> = this.appointmentStore.dataSource;
  readonly length: Signal<number> = this.appointmentStore.length;

  constructor(
    private readonly clientAppointmentService: ClientAppointmentService,
    private readonly location: Location
  ) {
  }

  handleCancel() {
    const appointment = this.appointmentStore.appointment();
    if (!appointment) return;
    this.clientAppointmentService
      .cancelAppointment(appointment.id)
      .subscribe(() => {
        this.location.back();
      });
  }
}
