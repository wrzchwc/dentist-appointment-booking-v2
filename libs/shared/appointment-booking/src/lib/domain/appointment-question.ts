import { HealthFact } from './health-fact';

export interface AppointmentQuestion {
  readonly id: string;
  readonly question: string;
  readonly subquestion: string | null;
  readonly womenOnly: boolean;
  readonly fact?: HealthFact;
}
