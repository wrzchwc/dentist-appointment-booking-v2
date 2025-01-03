import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppointmentQuestion } from '../domain/appointment-question.model';
import {
  AppointmentQuestion as AppointmentQuestionDAO,
  BookAppointmentRequest
} from '@dentist-appointment-booking-v2/shared/appointment-booking';
import { TreatmentsRepository } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/treatments';
import { DateTime } from 'luxon';
import { END_HOUR, END_MINUTE, START_HOUR, START_MINUTE } from '../domain/time-units';
import { AvailableDatesCalculator } from './available-dates-calculator.service';
import { HealthReportsRepository } from './health-reports.repository.service';
import { AppointmentsRepository } from './appointments.repository.service';
import { AuthenticatedRequest } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/auth';
import { isAdmin, Role } from '@dentist-appointment-booking-v2/shared/auth';
import { AppointmentQuestionEntity } from '../domain/appointment-question.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppointmentBookingService {
  constructor(
    @InjectRepository(AppointmentQuestionEntity)
    private readonly appointmentQuestionRepository: Repository<AppointmentQuestion>,
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly healthReportsRepository: HealthReportsRepository,
    private readonly treatmentsRepository: TreatmentsRepository,
    private readonly availableDatesCalculator: AvailableDatesCalculator
  ) {
  }

  async bookAppointment(userId: string, request: BookAppointmentRequest): Promise<string> {
    const { id } = await this.appointmentsRepository.create(userId, request.startsAt);
    await Promise.all([
      this.healthReportsRepository.saveAll(request.healthReports, id),
      this.treatmentsRepository.saveAll(request.treatments, id)
    ]);
    return 'SUCCESS';
  }

  async getAppointmentQuestions(): Promise<AppointmentQuestionDAO[]> {
    const appointmentQuestions = await this.appointmentQuestionRepository.find();
    return appointmentQuestions.map((appointmentQuestion) => ({
      id: appointmentQuestion.id,
      question: appointmentQuestion.question,
      subquestion: appointmentQuestion.subquestion,
      womenOnly: appointmentQuestion.womenOnly,
      fact: appointmentQuestion.healthFact ? {
        id: appointmentQuestion.healthFact.id,
        value: appointmentQuestion.healthFact.value
      } : undefined
    }));
  }

  async getAvailableDates(date: string, estimatedLength: number): Promise<string[]> {
    const fromISO = DateTime.fromISO(date);
    if (!fromISO.isValid) {
      return Array.of<string>();
    }
    fromISO.set({ second: 0, millisecond: 0 });
    const appointmentsAtDate = await this.appointmentsRepository.findAllInRange(
      fromISO.set({ hour: START_HOUR, minute: START_MINUTE }).toISO(),
      fromISO.set({ hour: END_HOUR, minute: END_MINUTE }).toISO()
    );
    return this.availableDatesCalculator.calculateAvailableDates(appointmentsAtDate, fromISO, estimatedLength);
  }

  async rescheduleAppointment(appointmentId: string, startsAt: string, request: AuthenticatedRequest): Promise<string> {
    await this.findAppointmentAndCheckRoles(appointmentId, request.userId, request.roles);
    await this.appointmentsRepository.updateStartDate(appointmentId, startsAt);
    return 'SUCCESS';
  }

  async cancelAppointment(appointmentId: string, request: AuthenticatedRequest): Promise<string> {
    await this.findAppointmentAndCheckRoles(appointmentId, request.userId, request.roles);
    await this.appointmentsRepository.deleteById(appointmentId);
    return 'SUCCESS';
  }

  private async findAppointmentAndCheckRoles(appointmentId: string, userId: string, roles: Role[]): Promise<void> {
    const appointment = await this.appointmentsRepository.findOneById(appointmentId);
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    } else if (appointment.userId !== userId && !isAdmin(roles)) {
      throw new ForbiddenException('Unauthorised action');
    }
  }
}
