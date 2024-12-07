import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentEntity } from './domain/treatment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentEntity])]
})
export class TreatmentsModule {}
