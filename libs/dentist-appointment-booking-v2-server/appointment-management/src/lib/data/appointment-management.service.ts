import { Injectable } from '@nestjs/common';
import {
  Appointment,
  AppointmentsRepository
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';
import { TreatmentDAO, AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { Treatment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/treatments';
import { Service } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/services';

@Injectable()
export class AppointmentManagementService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository
  ) {
  }

  async getAppointmentsByUserIdInRange(userId: string, after: string, before: string): Promise<AppointmentDAO[]> {
    const foundAppointments: Appointment[] = await this.appointmentsRepository.findAllByUserIdInRange(userId, after, before);
    return foundAppointments
      .map((appointment) => ({
        id: appointment.id,
        startsAt: appointment.startsAt,
        treatments: this.transformTreatments(appointment.treatments)
      })).filter((appointment) => appointment.treatments.length > 0);
  }

  private transformTreatments(treatments: Treatment[] | undefined): TreatmentDAO[] {
    if (!treatments) return [];
    return treatments.filter((treatment: Treatment) => !!treatment.serviceId)
      .map((treatment: Treatment) => ({
        name: (treatment.serviceId as Service).name
      }));
  }
}
