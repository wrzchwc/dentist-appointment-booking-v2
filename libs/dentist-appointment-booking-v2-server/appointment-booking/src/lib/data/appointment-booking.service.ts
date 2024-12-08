import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppointmentQuestion } from '../domain/appointment-question.model';
import {
  AppointmentQuestion as AppointmentQuestionDAO,
  BookAppointmentRequest
} from '@dentist-appointment-booking-v2/shared/appointment-booking';
import {
  Appointment,
  AppointmentsRepository
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentQuestionEntity } from '../domain/appointment-question.entity';
import {
  HealthReportsRepository
} from '@dentist-appointment-booking/dentist-appointment-booking-v2-server/health-reports';
import { TreatmentsRepository } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/treatments';

@Injectable()
export class AppointmentBookingService {
  constructor(
    @InjectRepository(AppointmentQuestionEntity)
    private readonly appointmentQuestionRepository: Repository<AppointmentQuestion>,
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly healthReportsRepository: HealthReportsRepository,
    private readonly treatmentsRepository: TreatmentsRepository
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

  getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentsRepository.findAll();
  }
}
