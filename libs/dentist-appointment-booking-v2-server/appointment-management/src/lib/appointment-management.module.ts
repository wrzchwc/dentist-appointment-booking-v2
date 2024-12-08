import { Module } from '@nestjs/common';
import { AppointmentManagementService } from './data/appointment-management.service';
import { AppointmentManagementController } from './api/appointment-management.controller';
import { AppointmentsModule } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointments';

@Module({
  controllers: [AppointmentManagementController,],
  providers: [AppointmentManagementService],
  imports: [AppointmentsModule]
})
export class AppointmentManagementModule {}
