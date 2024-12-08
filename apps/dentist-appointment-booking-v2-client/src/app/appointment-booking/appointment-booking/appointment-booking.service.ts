import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AppointmentQuestion,
  HealthReportDTO,
  TreatmentDTO
} from '@dentist-appointment-booking-v2/shared/appointment-booking';

@Injectable({
  providedIn: 'root'
})
export class AppointmentBookingService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = '/api/appointment-booking';

  createAppointment(startsAt: Date, treatments: TreatmentDTO[], facts: HealthReportDTO[]): Observable<object> {
    return this.httpClient.post(this.baseUrl, { startsAt, treatments, facts });
  }

  getAppointmentQuestions(): Observable<AppointmentQuestion[]> {
    return this.httpClient.get<AppointmentQuestion[]>(`${this.baseUrl}/questions`);
  }
}
