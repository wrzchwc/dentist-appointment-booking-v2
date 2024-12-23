import { Injectable } from '@angular/core';
import { TreatmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { NamedPriceItem } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/services';

@Injectable({
  providedIn: 'root'
})
export class DataSourceFactory {
  create(treatments: TreatmentDAO[]): NamedPriceItem[] {
    return treatments.map((treatment) => ({
      quantity: treatment.quantity || 0,
      detail: treatment.detail || '',
      name: treatment.name,
      price: treatment.price || 0
    }));
  }
}
