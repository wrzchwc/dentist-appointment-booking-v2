import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormRecord, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { HealthStateDescriptor, Info } from '../model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { AppointmentQuestion } from '@dentist-appointment-booking-v2/shared/appointment-booking';

@Component({
  selector: 'app-health-question',
  templateUrl: './health-question.component.html',
  styleUrls: ['./health-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatRadioModule, MatInputModule],
  standalone: true
})
export class HealthQuestionComponent implements OnChanges, OnDestroy {
  @Input() question: AppointmentQuestion | undefined;

  @Output() readonly positive: EventEmitter<HealthStateDescriptor> = new EventEmitter();
  @Output() readonly update: EventEmitter<Info> = new EventEmitter();
  @Output() readonly negative: EventEmitter<string> = new EventEmitter();

  readonly response: FormRecord<FormControl<string | boolean>> = this.builder.record({
    positive: this.builder.control<boolean>(false, { nonNullable: true })
  });

  private readonly destroy$: Subject<void> = new Subject();

  constructor(private readonly builder: FormBuilder) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(): void {
    if (this.question?.subquestion) {
      const control = this.builder.control<string>('', { nonNullable: true });
      this.response.addControl('detail', control);
      control.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(375)).subscribe(() => {
        if (this.question) {
          this.update.emit({ id: this.question.fact?.id || '', additionalInfo: control.value });
        }
      });
    }
  }

  get subQuestion(): string {
    return this.question?.subquestion || '';
  }

  handlePositiveSelection(): void {
    if (this.question === undefined) {
      return;
    }
    this.positive.emit({
      id: this.question.fact?.id || '',
      payload: {
        fact: this.question.fact?.value || '',
        womenOnly: this.question.womenOnly
      }
    });
  }

  handleNegativeSelection(): void {
    this.negative.emit(this.question?.fact?.id || '');
  }
}
