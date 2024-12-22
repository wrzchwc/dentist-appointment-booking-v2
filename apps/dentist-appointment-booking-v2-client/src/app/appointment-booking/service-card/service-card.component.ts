import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AppointmentCartService } from '../appointment-cart.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { ServiceDAO } from '@dentist-appointment-booking-v2/shared/services';
import {
  AppointmentTimesPipe,
  TooltipPipe
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/services';

@Component({
    selector: 'app-service-card',
    templateUrl: './service-card.component.html',
    styleUrls: ['./service-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        MatCardModule,
        MatIconModule,
        MatTooltipModule,
        AsyncPipe,
        AppointmentTimesPipe,
        MatButtonModule,
        TooltipPipe,
    ],
    standalone: true,
})
export class ServiceCardComponent {
    @Input() service: ServiceDAO | undefined;

    @Output() serviceChange: EventEmitter<void> = new EventEmitter();

    constructor(private readonly cart: AppointmentCartService) {}

    getQuantityOf(service: ServiceDAO): Observable<number> {
        return this.cart.quantityOf(service);
    }

    handleRemoveServiceClick(): void {
        if (this.service) {
            this.cart.remove(this.service);
            this.serviceChange.emit();
        }
    }

    handleAddServiceClick(): void {
        if (this.service) {
            this.cart.add(this.service);
            this.serviceChange.emit();
        }
    }
}
