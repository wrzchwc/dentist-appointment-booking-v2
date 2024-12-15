import { Module } from '@nestjs/common';
import { AppointmentBookingController } from './api/appointment-booking.controller';
import { AppointmentBookingService } from './data/appointment-booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentQuestionEntity } from './domain/appointment-question.entity';
import { HealthFactEntity } from './domain/health-fact.entity';
import { AppointmentsModule } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';
import { TreatmentsModule } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/treatments';
import { HealthReportsModule } from '@dentist-appointment-booking/dentist-appointment-booking-v2-server/health-reports';
import { PeriodFactory } from './data/period-factory.service';
import { AvailableDatesCalculator } from './data/available-dates-calculator.service';

@Module({
  controllers: [AppointmentBookingController],
  providers: [AppointmentBookingService, PeriodFactory, AvailableDatesCalculator],
  imports: [
    TypeOrmModule.forFeature([
      AppointmentQuestionEntity,
      HealthFactEntity
    ]),
    AppointmentsModule,
    HealthReportsModule,
    TreatmentsModule
  ]
})
export class AppointmentBookingModule {
}
