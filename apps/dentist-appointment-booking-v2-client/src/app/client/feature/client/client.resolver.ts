import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/date';
import { ClientAppointmentManagementApiService } from './client-appointment-management-api.service';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Injectable({
  providedIn: 'root'
})
export class ClientResolver {
  private readonly clientService = inject(ClientAppointmentManagementApiService);
  private readonly dateService = inject(DateService);

  resolve(): Observable<AppointmentDAO[]> {
    return this.clientService.getAppointments(this.dateService.currentDay);
  }
}
