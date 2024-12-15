import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AppointmentQuestion,
  BookAppointmentRequest,
  HealthReportDTO,
  TreatmentDTO
} from '@dentist-appointment-booking-v2/shared/appointment-booking';

@Injectable({
  providedIn: 'root'
})
export class AppointmentBookingService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = '/api/appointment-booking';

  createAppointment(startsAt: string, treatments: TreatmentDTO[], healthReports: HealthReportDTO[]): Observable<string> {
    const body: BookAppointmentRequest = {
      startsAt,
      treatments,
      healthReports
    };
    return this.httpClient.post(this.baseUrl, body, {responseType: 'text'});
  }

  getAppointmentQuestions(): Observable<AppointmentQuestion[]> {
    return this.httpClient.get<AppointmentQuestion[]>(`${this.baseUrl}/questions`);
  }
}
