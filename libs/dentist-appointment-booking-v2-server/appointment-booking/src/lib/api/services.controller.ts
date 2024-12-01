import { Controller, Get, UseGuards } from '@nestjs/common';
import { ServicesService } from '../data/services.service';
import { Service } from '../domain/service.model';
import { AuthGuard } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-server/auth';

@Controller('appointment-booking/services')
@UseGuards(AuthGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  fetchServices(): Promise<Service[]> {
    return this.servicesService.fetchServices();
  }
}
