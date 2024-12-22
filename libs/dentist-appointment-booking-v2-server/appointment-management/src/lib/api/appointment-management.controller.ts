import { Controller, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import { AppointmentManagementService } from '../data/appointment-management.service';
import {
  AuthenticatedRequest,
  AuthGuard,
  Roles,
  RolesGuard
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/auth';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';
import { MAX_DATE } from '../domain/date';
import { Role } from '@dentist-appointment-booking-v2/shared/auth';

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

  @Get('admin')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getAppointments(
    @Query('after') after: string,
    @Query('before') before = MAX_DATE
  ): Promise<AppointmentDAO[]> {
    return this.appointmentManagementService.getAppointmentsInRange(after, before);
  }

  @Get(':id')
  getClientAppointment(@Param('id') appointmentId: string): Promise<AppointmentDAO> {
    return this.appointmentManagementService.getAppointmentById(appointmentId);
  }
}
