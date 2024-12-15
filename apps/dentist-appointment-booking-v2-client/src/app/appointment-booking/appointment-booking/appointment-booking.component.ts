import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  Signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Service } from '../../shared';
import { AppointmentCartService } from '../appointment-cart.service';
import { debounceTime, filter, Observable, switchMap } from 'rxjs';
import { DateService } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/date';
import { AppointmentBookingService } from './appointment-booking.service';
import { MatStepperModule } from '@angular/material/stepper';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentServicesComponent } from '../appointment-services/appointment-services.component';
import { DateComponent } from '../date/date.component';
import { HealthStateComponent } from '../health-state/health-state.component';
import { SummaryComponent } from '../summary/summary.component';
import {
  AppointmentQuestion,
  calculateTotalAppointmentLength
} from '@dentist-appointment-booking-v2/shared/appointment-booking';
import { AuthFacade } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/auth';
import { HealthStateStore } from '../health-state.store';
import { HealthStateDescriptor, Info } from '../model';
import { Store } from '@ngrx/store';
import {
  navigateToPage,
  Route
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/navigation';
import { UserProfile } from '@dentist-appointment-booking-v2/shared/auth';
import {
  AppointmentDateService, AvailableTimesStore
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-booking';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  providers: [HealthStateStore, AvailableTimesStore]
})
export class AppointmentBookingComponent implements OnInit, OnDestroy {
  readonly services = input<Service[]>([]);
  readonly appointmentQuestions = input<AppointmentQuestion[]>([]);

  private readonly authFacade = inject(AuthFacade);
  private readonly healthStateStore = inject(HealthStateStore);
  private readonly store = inject(Store);
  private readonly availableTimesStore = inject(AvailableTimesStore);
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly appointmentDateService: AppointmentDateService,
    private readonly booking: AppointmentBookingService,
    private readonly cart: AppointmentCartService,
    private readonly date: DateService
  ) {
  }

  readonly userProfile: Signal<UserProfile | undefined> = this.authFacade.userProfile;
  readonly facts: Signal<string[]> = this.healthStateStore.facts;
  readonly availableTimes: Signal<string[]> = this.availableTimesStore.availableTimes;

  get isCartValid(): boolean {
    return this.cart.valid;
  }

  get selectedDate$(): Observable<string | null> {
    return this.appointmentDateService.selectedDate$;
  }

  ngOnInit(): void {
    this.cart.initialize(this.services() || []);
    this.cart.change$.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(281.25)
    ).subscribe(() => {
      this.refreshAppointmentsAvailability();
    });
  }

  ngOnDestroy(): void {
    this.appointmentDateService.selectedDate$.next(null);
    this.date.reset();
  }

  refreshAppointmentsAvailability(): void {
    this.availableTimesStore.fetchTimes({
      date: this.date.currentWorkday.toISOString(),
      length: calculateTotalAppointmentLength(this.cart.lengthItems)
    });
  }

  handleBookAppointmentClick(event: MouseEvent): void {
    event.stopPropagation();
    this.appointmentDateService.selectedDate$.pipe(
      filter(Boolean),
      switchMap((startsAt) =>
        this.booking.createAppointment(startsAt, this.cart.quantities, this.healthStateStore.infos())
      )
    ).subscribe(() => this.store.dispatch(navigateToPage({route: Route.CLIENT})))
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
