import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationGuard  {
    constructor(private readonly authenticationService: AuthenticationService, private readonly router: Router) {}

    async canLoad(): Promise<boolean> {
        if (!this.authenticationService.authenticated$.value) {
            await this.router.navigateByUrl('/');
            return false;
        }
        return true;
    }
}
