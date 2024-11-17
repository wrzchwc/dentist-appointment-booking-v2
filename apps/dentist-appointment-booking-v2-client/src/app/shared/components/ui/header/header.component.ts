import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FetchUserProfileResponse } from '@dentist-appointment-booking-v2/shared/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgClass, RouterLink, MatIconModule, MatButtonModule, NgOptimizedImage],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly isAuthenticated = input(false);
  readonly profile = input<FetchUserProfileResponse>();

  readonly signOut = output();

  readonly logoUrl = computed(() =>
    this.isAuthenticated() ? '/' : '/appointment-preview'
  );

  initiateSignOut(): void {
    this.signOut.emit()
  }
}
