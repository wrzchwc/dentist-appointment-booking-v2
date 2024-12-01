import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentQuestionEntity } from '../domain/appointment-question.entity';
import { Repository } from 'typeorm';
import { AppointmentQuestion } from '../domain/appointment-question.model';
import {
  AppointmentQuestion as AppointmentQuestionDAO
} from '@dentist-appointment-booking-v2/shared/appointment-booking';

@Injectable()
export class AppointmentBookingService {
  constructor(
    @InjectRepository(AppointmentQuestionEntity)
    private readonly appointmentQuestionRepository: Repository<AppointmentQuestion>
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
}
