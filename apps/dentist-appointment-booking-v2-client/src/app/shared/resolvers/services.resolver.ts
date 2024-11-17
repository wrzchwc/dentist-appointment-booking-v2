import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Service } from '../model';
import { ServicesService } from '../services/services.service';

@Injectable({
    providedIn: 'root',
})
export class ServicesResolver  {
    constructor(private readonly servicesService: ServicesService) {}

    resolve(): Observable<Service[]> {
        return this.servicesService.getServices();
    }
}
