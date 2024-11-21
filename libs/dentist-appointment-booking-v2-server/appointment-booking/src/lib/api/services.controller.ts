import { Controller, Get } from '@nestjs/common';
import { ServicesService } from '../data/services.service';
import { Service } from '../domain/service.model';

@Controller('appointment-booking/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  fetchServices(): Promise<Service[]> {
    return this.servicesService.fetchServices();
  }
}
