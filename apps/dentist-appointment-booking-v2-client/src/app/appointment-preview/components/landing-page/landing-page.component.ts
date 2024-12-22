import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../../model';
import { NgIf } from '@angular/common';
import { AppointmentsListComponent } from '../../../shared';

@Component({
    selector: 'app-landing-feature',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
    imports: [NgIf, AppointmentsListComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
    readonly appointments: Appointment[] = this.activatedRoute.snapshot.data['appointments'];
    constructor(private readonly activatedRoute: ActivatedRoute) {}

    get today(): Date {
        return new Date();
    }
}
