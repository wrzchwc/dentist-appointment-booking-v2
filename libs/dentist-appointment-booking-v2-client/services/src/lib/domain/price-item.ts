interface PriceItem {
  readonly price: number | null;
  readonly detail: string | null;
  readonly quantity: number;
}

export interface NamedPriceItem extends PriceItem {
  readonly name: string;
}
