import { Controller, Get, Post, UseGuards, Request, Body, Query, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentBookingService } from '../data/appointment-booking.service';
import {
  AppointmentQuestion,
  BookAppointmentRequest, RescheduleAppointmentRequest
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
  bookAppointment(
    @Request() request: AuthenticatedRequest,
    @Body() body: BookAppointmentRequest
  ): Promise<string> {
    return this.appointmentBookingService.bookAppointment(request.userId, body);
  }

  @Get('questions')
  getAppointmentQuestions(): Promise<AppointmentQuestion[]> {
    return this.appointmentBookingService.getAppointmentQuestions();
  }

  @Get('available-dates')
  getAvailableAppointmentDates(
    @Query('date') date: string,
    @Query('length') length = Number.MAX_SAFE_INTEGER
  ): Promise<string[]> {
    return this.appointmentBookingService.getAvailableDates(date, length);
  }

  @Patch(':appointmentId')
  rescheduleAppointment(
    @Param('appointmentId') appointmentId: string,
    @Body() body: RescheduleAppointmentRequest,
    @Request() request: AuthenticatedRequest
    ): Promise<string> {
    return this.appointmentBookingService.rescheduleAppointment(appointmentId, body.startsAt, request.userId);
  }

  @Delete(':appointmentId')
  cancelAppointment(
    @Param('appointmentId') appointmentId: string,
    @Request() request: AuthenticatedRequest
  ): Promise<string> {
    return this.appointmentBookingService.cancelAppointment(appointmentId,  request.userId);
  }
}
