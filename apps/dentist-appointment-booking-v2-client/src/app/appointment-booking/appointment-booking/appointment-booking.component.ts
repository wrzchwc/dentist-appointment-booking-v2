import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, OnInit, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppointmentDateService } from '../../shared';
import { AppointmentCartService } from '../appointment-cart.service';
import { debounceTime, map, Observable, Subject, takeUntil } from 'rxjs';
import { DateService } from '../../shared/services/date.service';
import { AppointmentBookingService } from './appointment-booking.service';
import { LengthService } from '../../shared';
import { MatStepperModule } from '@angular/material/stepper';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentServicesComponent } from '../appointment-services/appointment-services.component';
import { DateComponent } from '../date/date.component';
import { HealthStateComponent } from '../health-state/health-state.component';
import { SummaryComponent } from '../summary/summary.component';
import { Service } from '../../shared';
import { AppointmentQuestion } from '@dentist-appointment-booking-v2/shared/appointment-booking';
import { AuthFacadeService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/auth';
import { HealthStateStore } from '../health-state.store';
import { HealthStateDescriptor, Info } from '../model';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatStepperModule,
    AsyncPipe,
    MatButtonModule,
    RouterLink,
    AppointmentServicesComponent,
    DateComponent,
    HealthStateComponent,
    SummaryComponent
  ],
  standalone: true,
  providers: [HealthStateStore]
})
export class AppointmentBookingComponent implements OnInit, OnDestroy {
  readonly services = input<Service[]>([]);
  readonly appointmentQuestions = input<AppointmentQuestion[]>([]);

  availableTimes: Date[] = [];

  private readonly destroy$: Subject<void> = new Subject();

  private readonly authFacade = inject(AuthFacadeService);
  private readonly healthStateStore = inject(HealthStateStore);

  constructor(
    private readonly time: AppointmentDateService,
    private readonly router: Router,
    private readonly booking: AppointmentBookingService,
    private readonly cart: AppointmentCartService,
    private readonly date: DateService,
    private readonly length: LengthService
  ) {
  }

  readonly userProfile = this.authFacade.userProfile;
  readonly facts: Signal<string[]> = this.healthStateStore.facts;

  get isCartValid(): boolean {
    return this.cart.valid;
  }

  get selectedDate$(): Observable<Date | null> {
    return this.time.selectedDate$;
  }

  ngOnInit(): void {
    this.cart.initialize(this.services() || []);
    this.cart.change$.pipe(takeUntil(this.destroy$), debounceTime(281.25)).subscribe(() => {
      this.refreshAppointmentsAvailability();
    });
  }

  ngOnDestroy(): void {
    this.time.selectedDate$.next(null);
    this.destroy$.next();
    this.destroy$.complete();
    this.date.reset();
  }

  refreshAppointmentsAvailability(): void {
    this.time
      .getAvailableDates(this.date.currentWorkday, this.length.calculateTotalLength(this.cart.lengthItems))
      .pipe(
        takeUntil(this.destroy$),
        map((times) => times.filter((time) => new Date(time) >= this.date.currentWorkday))
      )
      .subscribe((availableTimes) => {
        this.availableTimes = availableTimes;
      });
  }

  async handleBookAppointmentClick(event: MouseEvent): Promise<void> {
    event.stopPropagation();
    const startsAt = this.time.selectedDate$.value;
    if (startsAt !== null) {
      this.booking
        .createAppointment(startsAt, this.cart.quantities, this.healthStateStore.infos())
        .pipe(takeUntil(this.destroy$))
        .subscribe(async () => {
          await this.router.navigateByUrl('/client');
        });
    }
  }

  storeHealthDescriptor(descriptor: HealthStateDescriptor) {
    this.healthStateStore.storeDescriptor(descriptor)
  }

  removeHealthDescriptor(descriptorId: string) {
    this.healthStateStore.removeDescriptor(descriptorId);
  }

  storeAdditionalInfo(info: Info) {
    this.healthStateStore.updateDescriptor(info);
  }

  clearWomenOnly() {
    this.healthStateStore.clearWomenOnly();
  }
}
