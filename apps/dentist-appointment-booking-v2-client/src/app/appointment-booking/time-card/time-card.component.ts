import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgClass } from '@angular/common';
import {
  AppointmentDateService
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/appointment-booking';

@Component({
    selector: 'app-time-card',
    templateUrl: './time-card.component.html',
    styleUrls: ['./time-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatCardModule, NgClass, DatePipe],
    standalone: true,
})
export class TimeCardComponent implements OnInit, OnDestroy {
    @Input() date: string = new Date().toISOString();

    private readonly destroy$: Subject<void> = new Subject();

    private _notSelected = false;

    constructor(private readonly appointmentDateService: AppointmentDateService) {}

    ngOnInit(): void {
        this.appointmentDateService.selectedDate$
            .pipe(
              takeUntil(this.destroy$),
              filter(Boolean),
              map((time) => time !== this.date)
            )
            .subscribe((notSelected) => {
                this._notSelected = notSelected;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    get notSelected(): boolean {
        return this._notSelected;
    }

    handleClick($event: Event) {
        $event.stopPropagation();
        const selection: string | null =
            this.appointmentDateService.selectedDate$.value === this.date ? null : this.date;
        this.appointmentDateService.selectedDate$.next(selection);
    }
}
