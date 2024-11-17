import { inject } from '@angular/core';
import { AuthenticationService } from '../../shared';
import { Title } from './model';

export function appointmentListTitleResolver(): string {
    return inject(AuthenticationService).profile?.isAdmin ? Title.ADMIN : Title.CLIENT;
}
