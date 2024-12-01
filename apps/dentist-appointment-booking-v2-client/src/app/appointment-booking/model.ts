export interface HealthStateDescriptor {
  readonly id: string;
  readonly payload: HealthStatePayload;
}

export interface Info {
  readonly id: string;
  readonly additionalInfo?: string;
}

export interface HealthStatePayload {
  readonly fact: string;
  readonly womenOnly: boolean;
  additionalInfo?: string;
}

export interface Quantity {
  readonly id: string;
  readonly quantity: number;
}
