import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Appointment,
  AppointmentsRepository
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { AppointmentTransformer } from './appointment-transformer.service';

@Injectable()
export class AppointmentManagementService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly appointmentTransformer: AppointmentTransformer
  ) {
  }

  async getAppointmentsByUserIdInRange(userId: string, after: string, before: string): Promise<AppointmentDAO[]> {
    const foundAppointments: Appointment[] = await this.appointmentsRepository.findAllByUserIdInRange(userId, after, before);
    return this.appointmentTransformer.transformAppointments(foundAppointments)
      .filter((appointment) => appointment.treatments.length > 0);
  }

  async getAppointmentById(appointmentId: string): Promise<AppointmentDAO> {
    const appointment = await this.appointmentsRepository.findOneById(appointmentId);
    if(!appointment) throw new NotFoundException(`Appointment ${appointmentId} not found`);
    return this.appointmentTransformer.transformAppointment(appointment);
  }
}
