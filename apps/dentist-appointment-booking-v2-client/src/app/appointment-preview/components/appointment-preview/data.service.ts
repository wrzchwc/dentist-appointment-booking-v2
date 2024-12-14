import { Injectable } from '@angular/core';
import { NamedPriceItem, LengthService } from '../../../shared';
import { TreatmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Injectable({providedIn: 'root'})
export class DataService {
    constructor(private readonly lengthService: LengthService) {}

    createDateSource(treatments: TreatmentDAO[]): NamedPriceItem[] {
        return treatments.map((treatment) => ({
            quantity: treatment.quantity || 0,
            detail: treatment.detail || '',
            name: treatment.name,
            price: treatment.price || 0,
        }));
    }

    calculateLength(treatments: TreatmentDAO[]): number {
        return this.lengthService.calculateTotalLength(
            treatments.map((treatment) => ({
                quantity: treatment.quantity || 0,
                length: treatment.lengthEach || 0,
            }))
        );
    }
}
