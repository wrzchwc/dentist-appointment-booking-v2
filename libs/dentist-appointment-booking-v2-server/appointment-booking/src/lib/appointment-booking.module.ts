import { Module } from '@nestjs/common';
import { AppointmentBookingController } from './api/appointment-booking.controller';
import { AppointmentBookingService } from './data/appointment-booking.service';
import { ServicesController } from './api/services.controller';
import { ServicesService } from './data/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './domain/service.entity';
import { AppointmentQuestionEntity } from './domain/appointment-question.entity';
import { HealthFactEntity } from './domain/health-fact.entity';
import { AppointmentsModule } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';

@Module({
  controllers: [AppointmentBookingController, ServicesController],
  providers: [AppointmentBookingService, ServicesService],
  imports: [
    TypeOrmModule.forFeature([
      ServiceEntity,
      AppointmentQuestionEntity,
      HealthFactEntity
    ]),
    AppointmentsModule
  ]
})
export class AppointmentBookingModule {
}
