export interface FetchAppointmentsResponse {
  readonly appointments: Appointment[]
}

export interface Appointment {
  readonly id: string;
  readonly startsAt: string;
  readonly treatments: TreatmentDAO[];
  readonly user?: UserDAO;
}

interface UserDAO {
  readonly name: string;
  readonly surname: string;
}

export interface TreatmentDAO {
  readonly name: string;
}
