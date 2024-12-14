import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { AppointmentManagementService } from '../data/appointment-management.service';
import {
  AuthenticatedRequest,
  AuthGuard
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/auth';
import { FetchAppointmentsResponse } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { MAX_DATE } from '../domain/date';

@Controller('appointment-management')
@UseGuards(AuthGuard)
export class AppointmentManagementController {
  constructor(
    private appointmentManagementService: AppointmentManagementService
  ) {}


  @Get()
  getClientAppointments(
    @Request() request: AuthenticatedRequest,
    @Query('after') after: string,
    @Query('before') before = MAX_DATE
  ): Promise<FetchAppointmentsResponse> {
    return this.appointmentManagementService.getAppointmentsByUserIdInRange(
      request.userId,
      after,
      before
    );
  }
}
