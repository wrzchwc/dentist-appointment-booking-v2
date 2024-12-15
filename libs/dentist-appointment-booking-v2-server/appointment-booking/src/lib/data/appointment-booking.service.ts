import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppointmentQuestion } from '../domain/appointment-question.model';
import {
  AppointmentQuestion as AppointmentQuestionDAO,
  BookAppointmentRequest,
  calculateTotalAppointmentLength,
  LengthItem
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
import {
  Treatment,
  TreatmentsRepository
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/treatments';
import { DateTime, Zone } from 'luxon';
import { Service } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/services';
import { END_HOUR, END_MINUTE, INTERVAL_MINUTE, START_HOUR, START_MINUTE } from '../domain/time-units';

interface Period {
  readonly startsAt: string;
  readonly length: number;
}

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

  async getAvailableDates(date: string, length: number): Promise<string[]> {
    const fromISO = DateTime.fromISO(date);
    if (!fromISO.isValid) {
      return Array.of<string>();
    }
    fromISO.set({ second: 0, millisecond: 0 });
    const appointmentsAtDate = await this.appointmentsRepository.findAllInRange(
      fromISO.set({ hour: START_HOUR, minute: START_MINUTE }).toISO(),
      fromISO.set({ hour: END_HOUR, minute: END_MINUTE }).toISO()
    );
    const periods = this.transformAppointmentsToPeriods(appointmentsAtDate);
    const unavailableTimes = this.transformPeriodsToUnavailableTimes(periods);
    const availableTimes: string[] = [];
    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
      for (let minute = 0; minute < 60; minute += INTERVAL_MINUTE) {
        const next = fromISO.set({ hour, minute }).toUTC();
        const coveredTimes = [];
        for (let minute = START_MINUTE; minute < length; minute += INTERVAL_MINUTE) {
          coveredTimes.push(next.plus({minute: minute}).toISO())
        }
        if (coveredTimes.every((time) => !unavailableTimes.includes(time))) {
          availableTimes.push(next.toISO());
        }
      }
    }
    return availableTimes;
  }

  private transformPeriodsToUnavailableTimes(periods: Period[]): string[] {
    return periods.flatMap((period) => {
      const dt = DateTime.fromISO(period.startsAt);
      const unavailableTimes = [];
      if (!dt.isValid) {
        return [];
      }
      const minutesAtStart = dt.minute;
      for (let offset = START_MINUTE; offset < period.length; offset += INTERVAL_MINUTE) {
        unavailableTimes.push(dt.set({ minute: minutesAtStart + offset }).toUTC().toISO());
      }
      return unavailableTimes;
    });

  }

  private transformAppointmentsToPeriods(appointments: Appointment[]): Period[] {
    return appointments.map((appointment) => ({
      startsAt: appointment.startsAt.toISOString(),
      length: calculateTotalAppointmentLength((appointment.treatments || []).map((treatment) => ({
        quantity: treatment.quantity,
        length: (treatment.serviceId as Service).length || 0
      })))
    }));
  }
}
