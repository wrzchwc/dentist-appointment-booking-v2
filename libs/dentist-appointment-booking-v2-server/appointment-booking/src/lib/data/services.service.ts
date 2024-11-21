import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from '../domain/service.entity';
import { Repository } from 'typeorm';
import { Service } from '../domain/service.model';

@Injectable()
export class ServicesService {
  constructor(@InjectRepository(ServiceEntity) private readonly serviceRepository: Repository<Service>) {}

  fetchServices(): Promise<Service[]> {
    return this.serviceRepository.find();
  }
}
