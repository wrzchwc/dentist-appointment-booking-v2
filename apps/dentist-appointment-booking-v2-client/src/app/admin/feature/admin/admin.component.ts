import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DateService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/date';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { AppointmentPreviewComponent, AppointmentsListComponent } from '../../../shared';
import {
  AppointmentsWrapperComponent
} from '../../../shared/components/page/appointments-wrapper/appointments-wrapper.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [
    AppointmentsListComponent,
    AppointmentsWrapperComponent,
    AppointmentPreviewComponent,
    DatePipe,
    RouterLink
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  readonly appointments = input<AppointmentDAO[]>([]);

  private readonly dateService = inject(DateService);

  get currentDay(): Date {
    return this.dateService.currentDay;
  }
}
