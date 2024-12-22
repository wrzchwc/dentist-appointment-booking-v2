import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceDAO } from '@dentist-appointment-booking-v2/shared/services';
import { ServicesApiService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/services';

@Injectable({
    providedIn: 'root',
})
export class ServicesResolver  {
    constructor(private readonly servicesService: ServicesApiService) {}

    resolve(): Observable<ServiceDAO[]> {
        return this.servicesService.getServices();
    }
}
