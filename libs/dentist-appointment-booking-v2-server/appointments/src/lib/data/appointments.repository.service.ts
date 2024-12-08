import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../domain/appointment.model';
import { AppointmentEntity } from '../domain/appointment.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<Appointment>
  ) {
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  findAllByUserId(userId: string, after: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: {userId, startsAt: MoreThanOrEqual(after)},
      select: ['id', 'startsAt'],
      relations: ['treatments']
    });
  }

  create(userId: string, startsAt: string): Promise<Appointment> {
    return this.appointmentRepository.save({userId, startsAt});
  }
}
