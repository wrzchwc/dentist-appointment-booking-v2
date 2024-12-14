export interface Service {
  readonly id: string
  readonly name: string;
  readonly count: number;
  readonly detail: string | null;
  readonly length: number | null;
  readonly price: number | null;
}
