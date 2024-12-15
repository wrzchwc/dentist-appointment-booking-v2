import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
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
import { Store } from '@ngrx/store';
import {
  rescheduleAppointment
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-booking';

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
  private readonly store = inject(Store);

  readonly appointment: Signal<AppointmentDAO | undefined> = this.appointmentStore.appointment;
  readonly dataSource: Signal<NamedPriceItem[]> = this.appointmentStore.dataSource;
  readonly length: Signal<number> = this.appointmentStore.length;
  readonly appointmentId = computed(() => this.appointment()?.id || '');
  readonly startsAt = computed(() => this.appointment()?.startsAt || '');

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

  handleReschedule() {
    this.store.dispatch(rescheduleAppointment({
      id: this.appointmentId(),
      length: this.length(),
      startsAt: this.startsAt()
    }));
  }
}
