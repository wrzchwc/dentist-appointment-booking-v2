export interface AppointmentDAO {
  readonly id: string;
  readonly startsAt: string;
  readonly treatments: TreatmentDAO[];
  readonly user?: UserDAO;
  readonly reports?: HealthReportDAO[];
}

export interface UserDAO {
  readonly name: string;
  readonly surname: string;
  readonly id?: string;
  readonly photoUrl?: string | null;
  readonly email?: string;
}

export interface TreatmentDAO {
  readonly name: string;
  readonly price?: number | null;
  readonly detail?: string | null;
  readonly quantity?: number;
  readonly lengthEach?: number;
}

export interface HealthReportDAO {
  readonly value: string;
  readonly additionalValue?: string;
}
