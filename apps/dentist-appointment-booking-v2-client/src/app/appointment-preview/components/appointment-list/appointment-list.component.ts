import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentPreviewClientService } from '../../services/appointment-preview-client.service';
import { AppointmentsComponent } from '../../../shared';
import { Title } from '@angular/platform-browser';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  templateUrl: './appointment-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppointmentsComponent]
})
export class AppointmentListComponent {
  appointments: AppointmentDAO[] = this.activatedRoute.snapshot.data['appointments'];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly appointmentPreviewClientService: AppointmentPreviewClientService,
    private readonly title: Title
  ) {
  }

  get listTitle(): string {
    return this.title.getTitle();
  }

  dateChange(date: Date): void {
    this.appointmentPreviewClientService.getAppointmentsAt(date).subscribe(() => {
      //todo: fix this
      this.appointments = [];
    });
  }
}
