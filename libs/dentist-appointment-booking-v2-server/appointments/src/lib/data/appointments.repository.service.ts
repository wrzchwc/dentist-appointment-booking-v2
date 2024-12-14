import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../domain/appointment.model';
import { AppointmentEntity } from '../domain/appointment.entity';
import { Between, Repository } from 'typeorm';

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

  findAllByUserIdInRange(userId: string, after: string, before: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: {userId, startsAt: Between(after, before)},
      select: ['id', 'startsAt'],
      relations: ['treatments']
    });
  }

  create(userId: string, startsAt: string): Promise<Appointment> {
    return this.appointmentRepository.save({userId, startsAt});
  }
}
