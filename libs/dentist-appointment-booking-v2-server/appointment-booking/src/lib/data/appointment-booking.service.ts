import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppointmentQuestion } from '../domain/appointment-question.model';
import {
  AppointmentQuestion as AppointmentQuestionDAO
} from '@dentist-appointment-booking-v2/shared/appointment-booking';
import {
  Appointment,
  AppointmentsRepository
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentQuestionEntity } from '../domain/appointment-question.entity';

@Injectable()
export class AppointmentBookingService {
  constructor(
    @InjectRepository(AppointmentQuestionEntity)
    private readonly appointmentQuestionRepository: Repository<AppointmentQuestion>,
    private readonly appointmentsRepository: AppointmentsRepository
  ) {
  }

  bookAppointment() {
    return 'booked appointment!';
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
