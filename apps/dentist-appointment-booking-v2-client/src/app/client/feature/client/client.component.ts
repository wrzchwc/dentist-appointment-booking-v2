import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { AppointmentsListComponent } from '../../../shared';
import {
  AppointmentsWrapperComponent
} from '../../../shared/components/page/appointments-wrapper/appointments-wrapper.component';
import { AppointmentPreviewComponent } from '../../../shared';
import { AuthFacade } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/auth';
import { RouterLink } from '@angular/router';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppointmentsListComponent, AppointmentsWrapperComponent, AppointmentPreviewComponent, RouterLink],
  standalone: true
})
export class ClientComponent {
  readonly appointments = input<AppointmentDAO[]>([]);

  private readonly authFacade = inject(AuthFacade);

  readonly name = computed(() => this.authFacade.userProfile()?.firstName)
}
