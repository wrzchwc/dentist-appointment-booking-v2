import { Module } from '@nestjs/common';
import { AppointmentManagementService } from './data/appointment-management.service';
import { AppointmentManagementController } from './api/appointment-management.controller';
import { AppointmentTransformer } from './data/appointment-transformer.service';
import { AdminAppointmentTransformer } from './data/admin-appointment-transformer.service';
import { TreatmentsTransformer } from './data/treatments-transformer.service';
import {
  AppointmentBookingModule
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/appointment-booking';

@Module({
  controllers: [AppointmentManagementController],
  providers: [
    AppointmentManagementService,
    AppointmentTransformer,
    AdminAppointmentTransformer,
    TreatmentsTransformer
  ],
  imports: [AppointmentBookingModule]
})
export class AppointmentManagementModule {
}
