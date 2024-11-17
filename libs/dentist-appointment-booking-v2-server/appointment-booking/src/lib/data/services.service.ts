import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicesService {
  fetchServices() {
    return Promise.resolve(['service1', 'service2']);
  }
}
