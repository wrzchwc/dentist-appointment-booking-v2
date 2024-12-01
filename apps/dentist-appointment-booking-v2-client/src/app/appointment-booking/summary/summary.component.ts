import { AfterViewChecked, ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import {
  AppointmentDateService,
  LengthService,
  NamedPriceItem,
  CardComponent,
  ServicesTableComponent,
  PricePipe
} from '../../shared';
import { AppointmentCartService } from '../appointment-cart.service';
import { filter, map, Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { DateTime } from 'luxon';
import { UserProfile } from '@dentist-appointment-booking-v2/shared/auth';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, CardComponent, ServicesTableComponent, DatePipe, AsyncPipe, PricePipe],
  standalone: true
})
export class SummaryComponent implements OnInit, AfterViewChecked {
  readonly userProfile = input<UserProfile>();
  readonly facts = input<string[]>([]);

  private readonly appointmentLength: number = this.length.calculateTotalLength(this.cart.lengthItems);

  private _endsAt: DateTime = DateTime.now();

  constructor(
    private readonly time: AppointmentDateService,
    private readonly cart: AppointmentCartService,
    private readonly length: LengthService
  ) {
  }

  ngOnInit(): void {
    this.time.selectedDate$
      .pipe(
        filter(Boolean),
        map((date) => DateTime.fromJSDate(date))
      )
      .subscribe((dateTime) => {
        this._endsAt = dateTime.plus({ minute: this.appointmentLength });
      });
  }

  ngAfterViewChecked(): void {
    const { value } = this.time.selectedDate$;
    if (value) {
      this._endsAt = DateTime.fromJSDate(value).plus({ minute: this.appointmentLength });
    }
  }

  get endsAt(): Date {
    return this._endsAt.toJSDate();
  }

  get selectedDate$(): Observable<Date | null> {
    return this.time.selectedDate$;
  }

  get priceItems(): NamedPriceItem[] {
    return this.cart.priceItems;
  }
}
