import { HealthFact } from './health-fact.model';

export interface AppointmentQuestion {
  readonly id: string;
  readonly question: string;
  readonly subquestion: string | null;
  readonly womenOnly: boolean;
  readonly healthFact: HealthFact | null;
}
