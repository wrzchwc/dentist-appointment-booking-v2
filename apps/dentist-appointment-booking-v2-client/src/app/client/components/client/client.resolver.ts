import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DateService } from '../../../shared/services/date.service';
import { ClientAppointmentManagementApiService } from './client-appointment-management-api.service';
import { Appointment } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Injectable({
  providedIn: 'root'
})
export class ClientResolver {
  private readonly clientService = inject(ClientAppointmentManagementApiService);
  private readonly dateService = inject(DateService);

  resolve(): Observable<Appointment[]> {
    return this.clientService.getAppointments(this.dateService.currentDay).pipe(
      map(response => response.appointments)
    );
  }
}
