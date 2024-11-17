export interface Service {
  readonly id: string
  readonly name: string;
  readonly count: number;
  readonly detail: number;
  readonly length?: number;
  readonly price?: number;
}
