import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthReportEntity } from './domain/health-report.entity';
import { HealthReportsRepository } from './data/health-reports.repository.service';

@Module({
  providers: [HealthReportsRepository],
  exports: [HealthReportsRepository],
  imports: [TypeOrmModule.forFeature([HealthReportEntity])]
})
export class HealthReportsModule {}
