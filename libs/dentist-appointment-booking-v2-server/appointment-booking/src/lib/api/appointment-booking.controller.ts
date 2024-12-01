import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppointmentBookingService } from '../data/appointment-booking.service';
import {
  AppointmentQuestion
} from '@dentist-appointment-booking-v2/shared/appointment-booking';
import { AuthGuard } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/auth';

@Controller('appointment-booking')
@UseGuards(AuthGuard)
export class AppointmentBookingController {
  constructor(
    private readonly appointmentBookingService: AppointmentBookingService
  ) {}

  @Post()
  bookAppointment() {
    return this.appointmentBookingService.bookAppointment();
  }

  @Get('questions')
  getAppointmentQuestions(): Promise<AppointmentQuestion[]> {
    return this.appointmentBookingService.getAppointmentQuestions();
  }
}
