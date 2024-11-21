import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Service } from '../model';
import { ServicesApiService } from '../services/services-api.service';

@Injectable({
    providedIn: 'root',
})
export class ServicesResolver  {
    constructor(private readonly servicesService: ServicesApiService) {}

    resolve(): Observable<Service[]> {
        return this.servicesService.getServices();
    }
}
