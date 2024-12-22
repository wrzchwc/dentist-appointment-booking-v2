import { Injectable } from '@nestjs/common';
import { Treatment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/treatments';
import { TreatmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { Service } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/services';

@Injectable()
export class TreatmentsTransformer {
  transform(treatments: Treatment[]): TreatmentDAO[] {
    return treatments
      .filter((treatment: Treatment) => !!treatment.serviceId)
      .map((treatment: Treatment) => ({
        name: (treatment.serviceId as Service).name
      }));
  }

  transformExtended(treatments: Treatment[]): TreatmentDAO[] {
    return treatments
      .filter((treatment: Treatment) => !!treatment.serviceId)
      .map((treatment: Treatment) => {
        return {
          name: (treatment.serviceId as Service).name,
          price: (treatment.serviceId as Service).price,
          detail: (treatment.serviceId as Service).detail,
          quantity: treatment.quantity,
          lengthEach: (treatment.serviceId as Service).length || 0
        };
      });
  }
}
