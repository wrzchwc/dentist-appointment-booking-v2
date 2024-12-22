export interface AppointmentDAO {
  readonly id: string;
  readonly startsAt: string;
  readonly treatments: TreatmentDAO[];
  readonly user?: UserDAO;
}

export interface UserDAO {
  readonly name: string;
  readonly surname: string;
}

export interface TreatmentDAO {
  readonly name: string;
  readonly price?: number | null;
  readonly detail?: string | null;
  readonly quantity?: number;
  readonly lengthEach?: number;
}
