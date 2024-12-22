import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../domain/appointment.model';
import { AppointmentEntity } from '../domain/appointment.entity';
import { Between, FindOperator, Repository } from 'typeorm';
import { DateTime } from 'luxon';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<Appointment>
  ) {
  }

  findOneById(appointmentId: string): Promise<Appointment | null> {
    return this.appointmentRepository.findOne({
      where: { id: appointmentId },
      relations: ['treatments']
    });
  }

  findOneByIdAdmin(appointmentId: string): Promise<Appointment | null> {
    return this.appointmentRepository.findOne({
      where: { id: appointmentId },
      relations: ['treatments', 'userId', 'healthReports']
    });
  }

  findAllByUserIdInRange(userId: string, after: string, before: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { userId, startsAt: this.getStartsAtRangeOperator(after, before) },
      select: ['id', 'startsAt'],
      relations: ['treatments'],
      order: { startsAt: 'ASC' }
    });
  }

  findAllInRangeIncludeUser(after: string, before: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { startsAt: this.getStartsAtRangeOperator(after, before) },
      select: ['id', 'startsAt'],
      relations: ['treatments', 'userId'],
      order: { startsAt: 'ASC' }
    });
  }

  findAllInRange(after: string, before: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { startsAt: this.getStartsAtRangeOperator(after, before) },
      select: ['startsAt'],
      relations: ['treatments'],
      order: { startsAt: 'ASC' }
    });
  }

  create(userId: string, startsAt: string): Promise<Appointment> {
    return this.appointmentRepository.save({ userId, startsAt });
  }

  updateStartDate(appointmentId: string, startsAt: string) {
    return this.appointmentRepository.update({id: appointmentId}, { startsAt });
  }

  deleteById(appointmentId: string) {
    return this.appointmentRepository.delete({ id: appointmentId });
  }

  private getStartsAtRangeOperator(after: string, before: string): FindOperator<Date> {
    return Between(DateTime.fromISO(after).toJSDate(), DateTime.fromISO(before).toJSDate());
  }
}
