import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AppointmentBookingService } from '../data/appointment-booking.service';
import {
  AppointmentQuestion,
  BookAppointmentRequest
} from '@dentist-appointment-booking-v2/shared/appointment-booking';
import {
  AuthenticatedRequest,
  AuthGuard
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/auth';

@Controller('appointment-booking')
@UseGuards(AuthGuard)
export class AppointmentBookingController {
  constructor(
    private readonly appointmentBookingService: AppointmentBookingService
  ) {}

  @Post()
  // todo: only for clients
  bookAppointment(
    @Request() request: AuthenticatedRequest,
    @Body() body: BookAppointmentRequest
  ): Promise<string> {
    return this.appointmentBookingService.bookAppointment(request.userId, body);
  }

  @Get('questions')
  // todo: only for clients
  getAppointmentQuestions(): Promise<AppointmentQuestion[]> {
    return this.appointmentBookingService.getAppointmentQuestions();
  }

  @Get('appointments')
  // todo: only for admins
  getAllAppointments() {
    return this.appointmentBookingService.getAllAppointments();
  }
}
