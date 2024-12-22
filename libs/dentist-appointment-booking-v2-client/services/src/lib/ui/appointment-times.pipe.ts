import { Pipe, PipeTransform } from '@angular/core';
import { ServiceDAO } from '@dentist-appointment-booking-v2/shared/services';

@Pipe({
    name: 'appointmentTimes',
    standalone: true,
})
export class AppointmentTimesPipe implements PipeTransform {
    transform(service: ServiceDAO, unit: string): string {
        if (service.count < 1) {
            throw new Error('Incorrect count value!');
        }

        return service.count === 1 ? `${service.length} ${unit}` : `${service.count} X ${service.length} ${unit}`;
    }
}
