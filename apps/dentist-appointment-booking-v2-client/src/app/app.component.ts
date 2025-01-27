import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { HeaderComponent } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/navigation';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  AuthFacade, UserProfile
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [HeaderComponent, RouterOutlet, NgClass],
    standalone: true,
})
export class AppComponent {
    private readonly authFacadeService: AuthFacade = inject(AuthFacade);

    readonly isAuthenticated = this.authFacadeService.isAuthenticated;
    readonly profile: Signal<UserProfile | undefined> = this.authFacadeService.userProfile;

    signOut() {
      this.authFacadeService.signOut();
    }
}
