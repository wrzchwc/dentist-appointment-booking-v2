import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceDAO, UpdateServiceRequest } from '@dentist-appointment-booking-v2/shared/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesApiService {
  private readonly baseUrl = '/api/services';

  private readonly httpClient = inject(HttpClient);

  getServices(): Observable<ServiceDAO[]> {
    return this.httpClient.get<ServiceDAO[]>(this.baseUrl);
  }

  updateService(serviceId: string, request: UpdateServiceRequest): Observable<string> {
    return this.httpClient.patch(`${this.baseUrl}/${serviceId}`, request, { responseType: 'text' });
  }
}
