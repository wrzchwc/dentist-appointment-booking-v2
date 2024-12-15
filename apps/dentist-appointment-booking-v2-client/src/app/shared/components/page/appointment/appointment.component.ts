import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Location, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CancelablePipe } from './cancelable.pipe';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  imports: [MatIconModule, NgIf, MatButtonModule, CancelablePipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentComponent {
  @Input() appointmentId = '';
  @Input() startsAt: string = new Date().toISOString().slice(0, 10);
  @Input() length = 0;

  readonly cancelAppointment = output();
  readonly rescheduleAppointment = output();

  private readonly dialogConfig: MatDialogConfig = { autoFocus: true };

  constructor(private readonly matDialog: MatDialog, private readonly location: Location) {
  }

  // reschedule(): void {
  //     this.dialogConfig.data = { id: this.appointmentId, startsAt: this.startsAt, length: this.length };
  //     this.matDialog
  //         .open(UpdateStartDateComponent, this.dialogConfig)
  //         .afterClosed()
  //         .pipe(filter(Boolean))
  //         .subscribe(() => {
  //             this.location.back();
  //         });
  // }

  reschedule(): void {
    this.rescheduleAppointment.emit();
  }

  cancel(): void {
    this.cancelAppointment.emit();
  }
}
