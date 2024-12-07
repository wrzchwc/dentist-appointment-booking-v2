export interface Appointment {
  readonly id: string;
  readonly startsAt: string;
  readonly userId: string;
  readonly treatments: object[];
}
