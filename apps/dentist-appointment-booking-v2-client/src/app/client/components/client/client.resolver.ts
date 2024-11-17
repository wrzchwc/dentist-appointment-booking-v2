import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { DateService } from '../../../shared/services/date.service';
import { ClientService } from './client.service';
import { Appointment } from '../../model';

@Injectable({
  providedIn: 'root'
})
export class ClientResolver {
  constructor(private readonly clientService: ClientService, private readonly dateService: DateService) {
  }

  resolve(): Observable<Appointment[]> {
    console.log('client resolver!');
    return of([]);
    // return this.clientService.getAppointments(this.dateService.currentDay);
  }
}
