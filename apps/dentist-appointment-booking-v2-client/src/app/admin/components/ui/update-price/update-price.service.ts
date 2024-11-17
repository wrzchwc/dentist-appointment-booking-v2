import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../../../../shared';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UpdatePriceService {
    private readonly baseUrl = `${environment.apiUrl}/api/services`;

    constructor(private client: HttpClient) {}

    updateServicePrice(serviceId: string, price: number): Observable<Service> {
        return this.client.patch<Service>(`${this.baseUrl}/${serviceId}`, { price });
    }
}
