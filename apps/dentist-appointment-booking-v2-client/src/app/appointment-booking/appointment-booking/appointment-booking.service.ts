import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quantity, Info } from '../model';
import { AppointmentQuestion } from '@dentist-appointment-booking-v2/shared/appointment-booking';

@Injectable({
  providedIn: 'root'
})
export class AppointmentBookingService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = '/api/appointment-booking';

  createAppointment(startsAt: Date, services: Quantity[], facts?: Info[]): Observable<object> {
    return this.httpClient.post(this.baseUrl, { startsAt, services, facts });
  }

  getAppointmentQuestions(): Observable<AppointmentQuestion[]> {
    return this.httpClient.get<AppointmentQuestion[]>(`${this.baseUrl}/questions`);
  }
}
