import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AdminAppointmentService } from './admin-appointment.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../../../../appointment-preview/components/appointment-preview/data.service';
import { DatePipe, Location, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { AppointmentComponent } from '../../../../shared';
import { CardComponent } from '../../../../shared';
import { Appointment1, NamedPriceItem, PricePipe } from '../../../../shared';
import { EmailPipe } from './email.pipe';
import { EndDatePipe } from '../../../../appointment-preview/components/appointment-preview/end-date.pipe';
import { ServicesTableComponent } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/services';

@Component({
    selector: 'app-admin-appointment',
    templateUrl: './admin-appointment.component.html',
    styleUrls: [
        './admin-appointment.component.scss',
        '../../../../shared/components/page/appointment/appointment.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppointmentComponent,
    NgIf,
    CardComponent,
    ServicesTableComponent,
    DatePipe,
    NgOptimizedImage,
    NgForOf,
    PricePipe,
    EmailPipe,
    EndDatePipe,
    ServicesTableComponent
  ],
    standalone: true,
})
export class AdminAppointmentComponent implements OnDestroy {
    readonly appointment: Appointment1 = this.activatedRoute.snapshot.data['appointment'];
    readonly dataSource: NamedPriceItem[] = this.appointmentService.createDateSource(this.appointment.services);
    readonly length: number = this.appointmentService.calculateLength(this.appointment.services);

    private readonly destroy$: Subject<void> = new Subject();

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly appointmentService: DataService,
        private readonly adminAppointmentService: AdminAppointmentService,
        private readonly location: Location
    ) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    handleCancel(): void {
        this.adminAppointmentService
            .cancelAppointment(this.appointment.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.location.back();
            });
    }
}
