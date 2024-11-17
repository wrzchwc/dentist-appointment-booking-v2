import { Controller, Get } from '@nestjs/common';
import { ServicesService } from '../data/services.service';

@Controller('appointment-booking/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  fetchServices() {
    return this.servicesService.fetchServices();
  }
}
