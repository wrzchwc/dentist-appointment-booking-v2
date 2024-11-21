import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../model';

@Injectable({
    providedIn: 'root',
})
export class ServicesApiService {
    private readonly baseUrl= '/api/appointment-booking/services';

    constructor(private readonly client: HttpClient) {}

    getServices(): Observable<Service[]> {
        return this.client.get<Service[]>(this.baseUrl);
    }
}
