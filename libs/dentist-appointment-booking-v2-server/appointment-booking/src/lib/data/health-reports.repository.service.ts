import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthReportEntity } from '../domain/health-report.entity';
import { Repository } from 'typeorm';
import { HealthReport } from '../domain/health-report.model';
import { HealthReportDTO } from '@dentist-appointment-booking-v2/shared/appointment-booking';

@Injectable()
export class HealthReportsRepository {
  constructor(
    @InjectRepository(HealthReportEntity)
    private readonly healthReportRepository: Repository<HealthReport>
  ) {
  }

  saveAll(reports: HealthReportDTO[], appointmentId: string) {
    const associatedReports = reports.map((report) => ({ ...report, appointmentId }));
    return this.healthReportRepository.save(associatedReports);
  }
}
