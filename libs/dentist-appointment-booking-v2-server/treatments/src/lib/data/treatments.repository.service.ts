import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TreatmentEntity } from '../domain/treatment.entity';
import { Treatment } from '../domain/treatment.model';
import { TreatmentDTO } from '@dentist-appointment-booking-v2/shared/appointment-booking';


@Injectable()
export class TreatmentsRepository {
  constructor(
    @InjectRepository(TreatmentEntity)
    private readonly treatmentsRepository: Repository<Treatment>,
  ) {
  }

  saveAll(treatments: TreatmentDTO[], appointmentId: string) {
    const associatedTreatments = treatments.map((treatment) => ({...treatment, appointmentId}));
    return this.treatmentsRepository.save(associatedTreatments);
  }
}
