import { HealthFact } from './health-fact.model';

export interface HealthReport {
  readonly additionalInfo: string | null;
  readonly healthFactId: string | HealthFact;
  readonly appointmentId: string;
}
