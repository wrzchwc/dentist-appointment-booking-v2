import { Injectable } from '@angular/core';
import { TreatmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { calculateTotalAppointmentLength } from '@dentist-appointment-booking-v2/shared/appointment-booking';

@Injectable({
  providedIn: 'root'
})
export class AppointmentLengthCalculator {
  calculateLength(treatments: TreatmentDAO[]): number {
    return calculateTotalAppointmentLength(
      treatments.map((treatment) => ({
        quantity: treatment.quantity || 0,
        length: treatment.lengthEach || 0
      }))
    );
  }
}
