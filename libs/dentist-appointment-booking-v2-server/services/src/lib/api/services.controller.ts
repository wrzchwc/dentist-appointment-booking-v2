import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ServicesService } from '../data/services.service';
import { AuthGuard, Roles, RolesGuard } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/auth';
import { Role } from '@dentist-appointment-booking-v2/shared/auth';
import { ServiceDAO, UpdateServiceRequest } from '@dentist-appointment-booking-v2/shared/services';

@Controller('services')
@UseGuards(AuthGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  fetchServices(): Promise<ServiceDAO[]> {
    return this.servicesService.fetchServices();
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  updateService(@Param('id') serviceId: string, @Body() request: UpdateServiceRequest): Promise<string> {
    return this.servicesService.updateService(serviceId, request);
  }
}
