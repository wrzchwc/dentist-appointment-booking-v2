import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDateService {
  readonly selectedDate$: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null);

  private readonly baseUrl = '/api/appointment-booking/available-dates';

  constructor(private readonly httpClient: HttpClient) {
  }

  getAvailableDates(date: Date, length: number): Observable<Date[]> {
    return of([new Date(Date.UTC(2024, 11, 13, 9, 15))]);
    // return this.httpClient.get<Date[]>(this.baseUrl, { params: { date: date.toISOString(), length } });
  }
}
