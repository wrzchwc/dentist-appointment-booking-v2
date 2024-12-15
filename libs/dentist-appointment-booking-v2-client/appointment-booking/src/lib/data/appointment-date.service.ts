import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDateService {
  readonly selectedDate$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
}
