import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ServicesService {
    private readonly baseUrl: string = `${environment.apiUrl}/api/services`;

    constructor(private readonly client: HttpClient) {}

    getServices(): Observable<Service[]> {
        return this.client.get<Service[]>(this.baseUrl);
    }
}
