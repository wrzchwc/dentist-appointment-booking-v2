import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DateService } from '../../../../shared/services/date.service';
import { RouterLink } from '@angular/router';
import { AppointmentsListComponent } from '../../../../shared';
import {
  AppointmentsWrapperComponent
} from '../../../../shared/components/page/appointments-wrapper/appointments-wrapper.component';
import { DatePipe } from '@angular/common';
import { AppointmentPreviewComponent } from '../../../../shared';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

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
  readonly appointments = input<AppointmentDAO[]>();

  private readonly dateService = inject(DateService);

  get currentDay(): Date {
    return this.dateService.currentDay;
  }
}
