import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { AppointmentTransformer } from './appointment-transformer.service';
import { AdminAppointmentTransformer } from './admin-appointment-transformer.service';
import {
  AppointmentsRepository
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointment-booking';

@Injectable()
export class AppointmentManagementService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly appointmentTransformer: AppointmentTransformer,
    private readonly adminAppointmentTransformer: AdminAppointmentTransformer
  ) {
  }

  async getAppointmentsByUserIdInRange(userId: string, after: string, before: string): Promise<AppointmentDAO[]> {
    const foundAppointments = await this.appointmentsRepository.findAllByUserIdInRange(userId, after, before);
    return this.appointmentTransformer.transformAppointments(foundAppointments);
  }

  async getAppointmentsInRange(after: string, before: string) {
    const foundAppointments = await this.appointmentsRepository.findAllInRangeIncludeUser(after, before);
    return this.adminAppointmentTransformer.transformAppointments(foundAppointments);
  }

  async getAppointmentById(appointmentId: string): Promise<AppointmentDAO> {
    const appointment = await this.appointmentsRepository.findOneById(appointmentId);
    if(!appointment) throw new NotFoundException(`Appointment ${appointmentId} not found`);
    return this.appointmentTransformer.transformAppointment(appointment);
  }

  async getAppointmentByIdAdmin(appointmentId: string): Promise<AppointmentDAO> {
    const appointment = await this.appointmentsRepository.findOneByIdAdmin(appointmentId);
    if(!appointment) throw new NotFoundException(`Appointment ${appointmentId} not found`);
    return this.adminAppointmentTransformer.transformAppointment(appointment);
  }
}
