import { Injectable } from '@nestjs/common';
import { Appointment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';
import { AppointmentDAO, TreatmentDAO, UserDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { Treatment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/treatments';
import { Service } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/services';
import { User } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/users';

@Injectable()
export class AppointmentTransformer {
  transformAppointments(appointments: Appointment[]): AppointmentDAO[] {
    return appointments.map((appointment) => ({
      id: appointment.id,
      startsAt: appointment.startsAt.toISOString(),
      treatments: this.transformTreatments(appointment.treatments),
      user: this.transformUser(appointment.userId)
    }));
  }

  transformAppointment(appointment: Appointment): AppointmentDAO {
    return {
      id: appointment.id,
      startsAt: appointment.startsAt.toISOString(),
      treatments: this.transformTreatmentsExtended(appointment.treatments)
    };
  }

  private transformTreatments(treatments: Treatment[] | undefined): TreatmentDAO[] {
    if (!treatments) return [];
    return treatments.filter((treatment: Treatment) => !!treatment.serviceId)
      .map((treatment: Treatment) => ({
        name: (treatment.serviceId as Service).name
      }));
  }

  private transformUser(user: string | User): UserDAO | undefined {
    if(typeof user !== 'object') {
      return undefined;
    }
    return {
      name: user.firstName,
      surname: user.lastName,
    }
  }

  private transformTreatmentsExtended(treatments: Treatment[] | undefined): TreatmentDAO[] {
    if (!treatments) return [];
    return treatments.filter((treatment: Treatment) => !!treatment.serviceId)
      .map((treatment: Treatment) => {
        return {
          name: (treatment.serviceId as Service).name,
          price: (treatment.serviceId as Service).price,
          detail: (treatment.serviceId as Service).detail,
          quantity: treatment.quantity,
          lengthEach: (treatment.serviceId as Service).length || 0
        }
      });
  }
}
