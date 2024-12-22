import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from '../domain/service.entity';
import { Repository } from 'typeorm';
import { Service } from '../domain/service.model';
import { ServiceDAO, UpdateServiceRequest } from '@dentist-appointment-booking-v2/shared/services';

@Injectable()
export class ServicesService {
  constructor(@InjectRepository(ServiceEntity) private readonly serviceRepository: Repository<Service>) {
  }

  fetchServices(): Promise<ServiceDAO[]> {
    return this.serviceRepository.find({ order: { price: 'ASC' } });
  }

  async updateService(serviceId: string, request: UpdateServiceRequest): Promise<string> {
    await this.serviceRepository.update({ id: serviceId }, { price: request.price });
    return 'SUCCESS';
  }
}
