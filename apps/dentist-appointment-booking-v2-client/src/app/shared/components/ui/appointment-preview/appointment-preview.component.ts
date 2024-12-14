import { ChangeDetectionStrategy, Component, computed, input, OnChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DatePipe} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentDAO } from '@dentist-appointment-booking-v2/shared/appointment-management';

@Component({
    selector: 'app-appointment-preview',
    templateUrl: './appointment-preview.component.html',
    styleUrls: ['./appointment-preview.component.scss'],
    imports: [MatCardModule, MatIconModule, MatChipsModule, RouterLink, MatButtonModule, DatePipe],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentPreviewComponent implements OnChanges {
    readonly appointment = input<AppointmentDAO>();

    readonly serviceNames = computed(() =>
      this.appointment()?.treatments?.map((treatment) => treatment.name) || []
    );

    private _link = '';
    get link(): string {
        return this._link;
    }

    constructor(private readonly router: Router) {}

    ngOnChanges(): void {
        if (this.appointment !== undefined) {
            const [role] = this.router.url.split('/').filter(Boolean);
            this._link = `/${role}/appointments/${this.appointment()?.id}`;
        }
    }
}
