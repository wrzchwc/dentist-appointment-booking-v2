import { Module } from '@nestjs/common';
import { AppointmentBookingController } from './api/appointment-booking.controller';
import { AppointmentBookingService } from './data/appointment-booking.service';
import { ServicesController } from './api/services.controller';
import { ServicesService } from './data/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './domain/service.entity';

@Module({
  controllers: [AppointmentBookingController, ServicesController],
  providers: [AppointmentBookingService, ServicesService],
  imports: [TypeOrmModule.forFeature([ServiceEntity])]
})
export class AppointmentBookingModule {}
