import { Module } from '@nestjs/common';
import { ServicesController } from './api/services.controller';
import { ServicesService } from './data/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './domain/service.entity';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports: [TypeOrmModule.forFeature([ServiceEntity])]
})
export class ServicesModule {}
