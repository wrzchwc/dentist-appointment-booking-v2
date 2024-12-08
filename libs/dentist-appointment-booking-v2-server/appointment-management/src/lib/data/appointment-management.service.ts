import { Injectable } from '@nestjs/common';
import {
  Appointment,
  AppointmentsRepository
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';
import { FetchAppointmentsResponse, TreatmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { Treatment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/treatments';
import { Service } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/services';

@Injectable()
export class AppointmentManagementService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository
  ) {
  }

  async getAppointmentsByUserId(userId: string, after: string): Promise<FetchAppointmentsResponse> {
    const foundAppointments: Appointment[] = await this.appointmentsRepository.findAllByUserId(userId, after);
    const appointments = foundAppointments
      .map((appointment) => ({
        id: appointment.id,
        startsAt: appointment.startsAt,
        treatments: this.transformTreatments(appointment.treatments)
      })).filter((appointment) => appointment.treatments.length > 0);

    return { appointments };
  }

  private transformTreatments(treatments: Treatment[] | undefined): TreatmentDAO[] {
    if (!treatments) return [];
    return treatments.filter((treatment: Treatment) => !!treatment.serviceId)
      .map((treatment: Treatment) => ({
        name: (treatment.serviceId as Service).name
      }));
  }
}
