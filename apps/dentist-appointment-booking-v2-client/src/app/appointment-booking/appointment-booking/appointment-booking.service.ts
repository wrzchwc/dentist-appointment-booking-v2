import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppointmentQuestion, Quantity, Info } from '../model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentBookingService {
  private readonly baseUrl = `${environment.apiUrl}/api/appointments`;

  constructor(private readonly client: HttpClient) {
  }

  createAppointment(startsAt: Date, services: Quantity[], facts?: Info[]): Observable<object> {
    return this.client.post(this.baseUrl, { startsAt, services, facts });
  }

  getAppointmentQuestions(): Observable<AppointmentQuestion[]> {
    return of([]);
    // return this.client.get<AppointmentQuestion[]>(`${this.baseUrl}/questions`);
  }
}
