import { Module } from '@nestjs/common';
import { AppointmentBookingController } from './api/appointment-booking.controller';
import { AppointmentBookingService } from './data/appointment-booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentQuestionEntity } from './domain/appointment-question.entity';
import { HealthFactEntity } from './domain/health-fact.entity';
import { TreatmentsModule } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/treatments';
import { PeriodFactory } from './data/period-factory.service';
import { AvailableDatesCalculator } from './data/available-dates-calculator.service';
import { HealthReportEntity } from './domain/health-report.entity';
import { HealthReportsRepository } from './data/health-reports.repository.service';
import { AppointmentsRepository } from './data/appointments.repository.service';
import { AppointmentEntity } from './domain/appointment.entity';

@Module({
  controllers: [AppointmentBookingController],
  providers: [
    AppointmentBookingService,
    PeriodFactory,
    AvailableDatesCalculator,
    HealthReportsRepository,
    AppointmentsRepository
  ],
  imports: [
    TypeOrmModule.forFeature([
      AppointmentQuestionEntity,
      HealthFactEntity,
      HealthReportEntity,
      AppointmentEntity
    ]),
    TreatmentsModule
  ],
  exports: [AppointmentsRepository]
})
export class AppointmentBookingModule {
}
