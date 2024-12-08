import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentEntity } from './domain/treatment.entity';
import { TreatmentsRepository } from './data/treatments.repository.service';

@Module({
  providers: [TreatmentsRepository],
  exports: [TreatmentsRepository],
  imports: [TypeOrmModule.forFeature([TreatmentEntity])]
})
export class TreatmentsModule {}
