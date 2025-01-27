import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NamedPriceItem } from '../shared';
import { LengthItem, TreatmentDTO } from '@dentist-appointment-booking-v2/shared/appointment-booking';
import { ServiceDAO } from '@dentist-appointment-booking-v2/shared/services';

@Injectable({
  providedIn: 'root'
})
export class AppointmentCartService {
  readonly change$: Subject<void> = new Subject();

  private readonly cart: Map<string, [BehaviorSubject<number>, ServiceDAO]> = new Map();

  initialize(services: ServiceDAO[]): void {
    services.forEach((service) => {
      this.cart.set(service.id, [new BehaviorSubject<number>(0), service]);
    });
  }

  get valid(): boolean {
    return !!this.cartValuesWithPositiveSubjectValue.find(([, service]) => service);
  }

  get priceItems(): NamedPriceItem[] {
    return this.cartValuesWithPositiveSubjectValue.map(([{ value }, { price, detail, name }]) => ({
      quantity: value,
      price,
      detail,
      name
    }));
  }

  get lengthItems(): LengthItem[] {
    return this.cartValuesWithPositiveSubjectValue.map(([{ value }, { length }]) => ({
      length: length || 0,
      quantity: value
    }));
  }

  get quantities(): TreatmentDTO[] {
    return this.cartValuesWithPositiveSubjectValue.map(([{ value }, { id }]) => ({ serviceId: id, quantity: value }));
  }

  quantityOf(service: ServiceDAO): BehaviorSubject<number> {
    return this.cart.get(service.id)?.at(0) as BehaviorSubject<number>;
  }

  add(service: ServiceDAO): void {
    const entry = this.cart.get(service.id);

    if (entry) {
      const quantity = entry[0];
      quantity.next(quantity.value + 1);
      this.change$.next();
    } else {
      throw new Error('Appointment Cart Error');
    }
  }

  remove(service: ServiceDAO): void {
    const entry = this.cart.get(service.id);

    if (entry) {
      const quantity = entry[0];
      quantity.next(quantity.value === 1 ? 0 : quantity.value - 1);
      this.change$.next();
    } else {
      throw new Error('Appointment Cart Error');
    }
  }

  private get cartValuesWithPositiveSubjectValue(): Array<[BehaviorSubject<number>, ServiceDAO]> {
    return Array.from(this.cart.values()).filter(([{ value }]) => value > 0);
  }
}
