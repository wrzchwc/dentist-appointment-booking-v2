import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './domain/appointment.entity';
import { AppointmentsRepository } from './data/appointments.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  providers: [AppointmentsRepository],
  exports: [AppointmentsRepository]
})
export class AppointmentsModule {}
