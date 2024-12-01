import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';
import { HealthStateDescriptor, Info } from '../model';
import { HealthQuestionComponent } from '../health-question/health-question.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { AppointmentQuestion } from '@dentist-appointment-booking-v2/shared/appointment-booking';

@Component({
  selector: 'app-health-state',
  templateUrl: './health-state.component.html',
  styleUrls: ['./health-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HealthQuestionComponent, MatSlideToggleModule, ReactiveFormsModule, NgClass, NgForOf, NgIf],
  standalone: true
})
export class HealthStateComponent implements OnInit, OnDestroy {
  readonly questions = input<AppointmentQuestion[]>([]);

  readonly positive = output<HealthStateDescriptor>();
  readonly additionalInfo = output<Info>();
  readonly negative = output<string>();
  readonly clearWomenOnly = output();

  private readonly builder = inject(FormBuilder);

  private readonly destroy$: Subject<void> = new Subject();

  readonly isWomen: FormControl<boolean> = this.builder.control(false, { nonNullable: true });

  ngOnInit(): void {
    this.isWomen.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter((value) => !value)
      )
      .subscribe(() => {
        this.clearWomenOnly.emit();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  store(descriptor: HealthStateDescriptor): void {
    this.positive.emit(descriptor);
  }

  remove(id: string): void {
    this.negative.emit(id);
  }

  update(info: Info): void {
    this.additionalInfo.emit(info);
  }
}
