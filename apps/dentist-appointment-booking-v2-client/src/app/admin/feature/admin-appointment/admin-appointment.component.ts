import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmailPipe } from './email.pipe';
import { ServicesTableComponent } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/services';
import { AppointmentComponent, CardComponent, NamedPriceItem, PricePipe } from '../../../shared';
import { EndDatePipe } from '../../../appointment-preview/components/appointment-preview/end-date.pipe';
import {
  AppointmentStore
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-information';
import { Store } from '@ngrx/store';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import {
  cancelAppointment,
  rescheduleAppointment
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-booking';

@Component({
  selector: 'app-admin-appointment',
  templateUrl: './admin-appointment.component.html',
  styleUrls: [
    './admin-appointment.component.scss',
    '../../../shared/components/page/appointment/appointment.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppointmentComponent,
    CardComponent,
    ServicesTableComponent,
    DatePipe,
    PricePipe,
    EmailPipe,
    EndDatePipe,
    ServicesTableComponent
  ],
  standalone: true,
  providers: [AppointmentStore]
})
export class AdminAppointmentComponent {
  private readonly appointmentStore = inject(AppointmentStore);
  private readonly store = inject(Store);

  readonly appointment: Signal<AppointmentDAO | undefined> = this.appointmentStore.appointment;
  readonly dataSource: Signal<NamedPriceItem[]> = this.appointmentStore.dataSource;
  readonly length: Signal<number> = this.appointmentStore.length;
  readonly appointmentId = computed(() => this.appointment()?.id || '');
  readonly startsAt = computed(() => this.appointment()?.startsAt || '');


  handleCancel() {
    this.store.dispatch(cancelAppointment({ appointmentId: this.appointmentId() }));
  }

  handleReschedule() {
    this.store.dispatch(rescheduleAppointment({
      id: this.appointmentId(),
      length: this.length(),
      startsAt: this.startsAt()
    }));
  }
}
