import { Injectable } from '@nestjs/common';
import { Period } from '../domain/period';
import { calculateTotalAppointmentLength } from '@dentist-appointment-booking-v2/shared/appointment-booking';
import { Service } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/services';
import { Appointment } from '../domain/appointment.model';

@Injectable()
export class PeriodFactory {
  createPeriods(appointments: Appointment[]): Period[] {
    return appointments.map((appointment) => ({
      startsAt: appointment.startsAt.toISOString(),
      length: calculateTotalAppointmentLength(
        (appointment.treatments || [])
          .filter((treatment) => !!treatment.serviceId)
          .map((treatment) => ({
            quantity: treatment.quantity,
            length: (treatment.serviceId as Service).length || 0
          })))
    }));
  }
}
