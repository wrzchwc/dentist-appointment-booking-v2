import { Module } from '@nestjs/common';
import { AppointmentManagementService } from './data/appointment-management.service';
import { AppointmentManagementController } from './api/appointment-management.controller';
import { AppointmentsModule } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';
import { AppointmentTransformer } from './data/appointment-transformer.service';

@Module({
  controllers: [AppointmentManagementController,],
  providers: [AppointmentManagementService, AppointmentTransformer],
  imports: [AppointmentsModule]
})
export class AppointmentManagementModule {}
