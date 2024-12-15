import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDateService {
  readonly selectedDate$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private readonly baseUrl = '/api/appointment-booking/available-dates';

  constructor(private readonly httpClient: HttpClient) {
  }

  getAvailableDates(date: string, length: number): Observable<string[]> {
    return this.httpClient.get<string[]>(this.baseUrl, { params: { date, length } });
  }
}
