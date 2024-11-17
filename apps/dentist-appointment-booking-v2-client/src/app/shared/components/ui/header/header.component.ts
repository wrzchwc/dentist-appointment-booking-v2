import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LogoUrlPipe } from './logo-url.pipe';
import { Store } from '@ngrx/store';
import { isAuthenticated, signOut } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgClass, RouterLink, MatIconModule, MatButtonModule, NgOptimizedImage, LogoUrlPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private readonly store = inject(Store);


  readonly isAuthenticated = this.store.selectSignal(isAuthenticated);

  signOut(): void {
    this.store.dispatch(signOut());
  }
}
