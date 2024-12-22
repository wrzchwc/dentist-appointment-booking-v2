import { Injectable } from '@nestjs/common';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { TreatmentsTransformer } from './treatments-transformer.service';
import { Appointment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointment-booking';

@Injectable()
export class AppointmentTransformer {
  constructor(private readonly treatmentsTransformer: TreatmentsTransformer) {
  }

  transformAppointments(appointments: Appointment[]): AppointmentDAO[] {
    return appointments
      .map((appointment) => ({
          id: appointment.id,
          startsAt: appointment.startsAt.toISOString(),
          treatments: this.treatmentsTransformer.transform(appointment.treatments || [])
        })
      )
      .filter((appointment) => appointment.treatments.length > 0);
  }

  transformAppointment(appointment: Appointment): AppointmentDAO {
    return {
      id: appointment.id,
      startsAt: appointment.startsAt.toISOString(),
      treatments: this.treatmentsTransformer.transformExtended(appointment.treatments || [])
    };
  }
}
