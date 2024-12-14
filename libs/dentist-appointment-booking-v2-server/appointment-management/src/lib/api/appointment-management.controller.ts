import { Controller, Get, UseGuards, Request, Query, Param } from '@nestjs/common';
import { AppointmentManagementService } from '../data/appointment-management.service';
import {
  AuthenticatedRequest,
  AuthGuard
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/auth';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { MAX_DATE } from '../domain/date';

@Controller('appointment-management')
@UseGuards(AuthGuard)
export class AppointmentManagementController {
  constructor(
    private appointmentManagementService: AppointmentManagementService
  ) {
  }

  @Get()
  getClientAppointments(
    @Request() request: AuthenticatedRequest,
    @Query('after') after: string,
    @Query('before') before = MAX_DATE
  ): Promise<AppointmentDAO[]> {
    return this.appointmentManagementService.getAppointmentsByUserIdInRange(
      request.userId,
      after,
      before
    );
  }

  @Get(':id')
  getClientAppointment(@Param('id') appointmentId: string): Promise<AppointmentDAO> {
    return this.appointmentManagementService.getAppointmentById(appointmentId);
  }
}
