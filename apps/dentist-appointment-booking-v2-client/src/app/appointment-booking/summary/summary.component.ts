import { AfterViewChecked, ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import {
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
import { calculateTotalAppointmentLength } from '@dentist-appointment-booking-v2/shared/appointment-booking';
import {
  AppointmentDateService
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-booking';

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

  private readonly appointmentLength: number = calculateTotalAppointmentLength(this.cart.lengthItems);

  private _endsAt: DateTime = DateTime.now();

  constructor(
    private readonly appointmentDateService: AppointmentDateService,
    private readonly cart: AppointmentCartService
  ) {
  }

  ngOnInit(): void {
    this.appointmentDateService.selectedDate$
      .pipe(
        filter(Boolean),
        map((date) => DateTime.fromISO(date))
      )
      .subscribe((dateTime) => {
        this._endsAt = dateTime.plus({ minute: this.appointmentLength });
      });
  }

  ngAfterViewChecked(): void {
    const { value } = this.appointmentDateService.selectedDate$;
    if (value) {
      this._endsAt = DateTime.fromISO(value).plus({ minute: this.appointmentLength });
    }
  }

  get endsAt(): Date {
    return this._endsAt.toJSDate();
  }

  get selectedDate$(): Observable<string | null> {
    return this.appointmentDateService.selectedDate$;
  }

  get priceItems(): NamedPriceItem[] {
    return this.cart.priceItems;
  }
}
