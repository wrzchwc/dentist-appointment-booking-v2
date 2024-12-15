import { Injectable } from '@angular/core';
import { NamedPriceItem } from '../../../shared';
import { TreatmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import {
  calculateTotalAppointmentLength
} from '@dentist-appointment-booking-v2/shared/appointment-booking';

@Injectable({ providedIn: 'root' })
export class DataService {
  createDateSource(treatments: TreatmentDAO[]): NamedPriceItem[] {
    return treatments.map((treatment) => ({
      quantity: treatment.quantity || 0,
      detail: treatment.detail || '',
      name: treatment.name,
      price: treatment.price || 0
    }));
  }

  calculateLength(treatments: TreatmentDAO[]): number {
    return calculateTotalAppointmentLength(
      treatments.map((treatment) => ({
        quantity: treatment.quantity || 0,
        length: treatment.lengthEach || 0
      }))
    );
  }
}
