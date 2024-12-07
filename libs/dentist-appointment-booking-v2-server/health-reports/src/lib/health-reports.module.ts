import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthReportEntity } from './domain/health-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HealthReportEntity])]
})
export class HealthReportsModule {}
