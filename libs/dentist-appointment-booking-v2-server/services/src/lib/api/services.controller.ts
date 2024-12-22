import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ServicesService } from '../data/services.service';
import { Service } from '../domain/service.model';
import { AuthGuard, Roles } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/auth';
import { Role } from '@dentist-appointment-booking-v2/shared/auth';
import { RolesGuard } from '../../../../auth/src/lib/api/roles.guard';

@Controller('services')
@UseGuards(AuthGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  fetchServices(): Promise<Service[]> {
    return this.servicesService.fetchServices();
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  updateService(@Param('id') serviceId: string) {
    return 'PATCH SUCCESS';
  }
}
