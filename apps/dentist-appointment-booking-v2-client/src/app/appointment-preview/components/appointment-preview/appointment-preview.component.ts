import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    NamedPriceItem,
    PricePipe,
    AppointmentComponent,
    CardComponent,
} from '../../../shared';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location, NgForOf, NgIf } from '@angular/common';
import { AppointmentManagementClientService } from '../../services/appointment-management-client.service';
import { EmailPipe } from './email.pipe';
import { DataService } from './data.service';
import { EndDatePipe } from './end-date.pipe';
import { AppointmentPreview } from '../../model';
import { AuthenticationService } from '../../services/authentication.service';
import { ServicesTableComponent } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/services';

@Component({
    selector: 'app-appointment-preview',
    standalone: true,
    templateUrl: './appointment-preview.component.html',
    styleUrls: [
        './appointment-preview.component.scss',
        '../../../shared/components/page/appointment/appointment.component.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppointmentComponent,
    CardComponent,
    EmailPipe,
    EndDatePipe,
    NgForOf,
    NgIf,
    PricePipe,
    ServicesTableComponent,
    DatePipe,
    ServicesTableComponent
  ],
    providers: [AppointmentManagementClientService, DataService],
})
export class AppointmentPreviewComponent {
    readonly preview: AppointmentPreview = this.activatedRoute.snapshot.data['appointment'];
    readonly dataSource: NamedPriceItem[] = this.dataService.createDateSource(this.preview.services);
    readonly length: number = this.dataService.calculateLength(this.preview.services);

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly dataService: DataService,
        private readonly location: Location,
        private readonly appointmentManagementService: AppointmentManagementClientService,
        private readonly authentication: AuthenticationService
    ) {}

    get isAdmin(): boolean {
        return !!this.authentication.profile?.isAdmin;
    }

    cancelAppointment(): void {
        this.appointmentManagementService.cancelAppointment(this.preview.id).subscribe(() => {
            this.location.back();
        });
    }
}
