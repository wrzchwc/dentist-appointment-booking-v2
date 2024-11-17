import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderComponent } from './shared/components/ui/header/header.component';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [HeaderComponent, RouterOutlet, NgClass],
    standalone: true,
})
export class AppComponent {
    private readonly store = inject(Store);

    readonly isAuthenticated = this.store.selectSignal(isAuthenticated);
}
