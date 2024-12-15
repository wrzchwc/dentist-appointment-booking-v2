import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentBookingApiService {
  private readonly baseUrl: string = '/api/appointment-booking';

  private readonly httpClient = inject(HttpClient);

  rescheduleAppointment(appointmentId: string, startsAt: string): Observable<string> {
    return this.httpClient.patch(
      `${this.baseUrl}/${appointmentId}`,
      { startsAt },
      {responseType: 'text'}
    );
  }

  getAvailableTimes(date: string, length: number): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${this.baseUrl}/available-dates`,
      { params: { date, length } }
    );
  }
}
