import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { ServiceDAO } from '@dentist-appointment-booking-v2/shared/services';

@Component({
    selector: 'app-appointment-services',
    templateUrl: './appointment-services.component.html',
    styleUrls: ['./appointment-services.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgForOf, ServiceCardComponent],
    standalone: true,
})
export class AppointmentServicesComponent {
    @Input() services: ServiceDAO[] = [];
}
