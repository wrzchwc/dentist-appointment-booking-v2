import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Role } from '@dentist-appointment-booking-v2/shared/auth';
import { Route } from '../domain/route';

interface UserProfile {
  readonly firstName: string;
  readonly roles?: Role[];
  readonly photoUrl?: string;
}

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgClass, RouterLink, MatIconModule, MatButtonModule, NgOptimizedImage],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly profile = input<UserProfile>();

  readonly signOut = output();

  readonly isAuthenticated = computed(() => !!this.profile());
  readonly isAdmin = computed(() => this.profile()?.roles?.includes(Role.ADMIN));

  readonly logoUrl = computed(() => {
      if (this.isAdmin()) {
        return Route.ADMIN;
      } else if (this.isAuthenticated()) {
        return Route.CLIENT;
      }
      return Route.HOME;
    }
  );

  initiateSignOut(): void {
    this.signOut.emit();
  }
}
