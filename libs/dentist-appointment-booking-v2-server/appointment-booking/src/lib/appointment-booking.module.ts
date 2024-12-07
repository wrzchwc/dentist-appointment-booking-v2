import { Module } from '@nestjs/common';
import { AppointmentBookingController } from './api/appointment-booking.controller';
import { AppointmentBookingService } from './data/appointment-booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentQuestionEntity } from './domain/appointment-question.entity';
import { HealthFactEntity } from './domain/health-fact.entity';
import { AppointmentsModule } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';

@Module({
  controllers: [AppointmentBookingController],
  providers: [AppointmentBookingService],
  imports: [
    TypeOrmModule.forFeature([
      AppointmentQuestionEntity,
      HealthFactEntity
    ]),
    AppointmentsModule
  ]
})
export class AppointmentBookingModule {
}
