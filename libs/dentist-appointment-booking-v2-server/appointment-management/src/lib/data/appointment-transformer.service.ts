import { Injectable } from '@nestjs/common';
import { Appointment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';
import { AppointmentDAO, TreatmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { Treatment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/treatments';
import { Service } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/services';

@Injectable()
export class AppointmentTransformer {
  transformAppointments(appointments: Appointment[]): AppointmentDAO[] {
    return appointments.map((appointment) => ({
      id: appointment.id,
      startsAt: appointment.startsAt.toISOString(),
      treatments: this.transformTreatments(appointment.treatments)
    }));
  }

  transformAppointment(appointment: Appointment): AppointmentDAO {
    return {
      id: appointment.id,
      startsAt: appointment.startsAt.toISOString(),
      treatments: this.transformTreatments2(appointment.treatments)
    };
  }

  private transformTreatments2(treatments: Treatment[] | undefined): TreatmentDAO[] {
    if (!treatments) return [];
    return treatments.filter((treatment: Treatment) => !!treatment.serviceId)
      .map((treatment: Treatment) => {
        return {
          name: (treatment.serviceId as Service).name,
          price: (treatment.serviceId as Service).price,
          detail: (treatment.serviceId as Service).detail,
          quantity: treatment.quantity,
          lengthEach: (treatment.serviceId as Service).length
        }
      });
  }

  private transformTreatments(treatments: Treatment[] | undefined): TreatmentDAO[] {
    if (!treatments) return [];
    return treatments.filter((treatment: Treatment) => !!treatment.serviceId)
      .map((treatment: Treatment) => ({
        name: (treatment.serviceId as Service).name
      }));
  }
}
