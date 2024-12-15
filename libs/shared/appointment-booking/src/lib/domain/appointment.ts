export interface BookAppointmentRequest {
  readonly startsAt: string;
  readonly treatments: TreatmentDTO[];
  readonly healthReports: HealthReportDTO[];
}

export interface TreatmentDTO {
  readonly serviceId: string;
  readonly quantity: number;
}

export interface HealthReportDTO {
  readonly healthFactId: string;
  readonly additionalInfo?: string;
}

export interface RescheduleAppointmentRequest {
  readonly startsAt: string;
}
