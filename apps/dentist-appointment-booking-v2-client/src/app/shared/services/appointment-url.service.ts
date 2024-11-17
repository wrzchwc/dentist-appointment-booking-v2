import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../index';

interface ApiUrl {
    readonly ADMIN: string;
    readonly CLIENT: string;
}

const BaseUrl: ApiUrl = {
    ADMIN: `${environment.apiUrl}/api/appointments`,
    CLIENT: `${environment.apiUrl}/api/appointments/me`,
};

@Injectable({ providedIn: 'root' })
export class AppointmentUrlService {
    constructor(private readonly authentication: AuthenticationService) {}

    getBaseUrl(isAdmin: boolean): string {
        return isAdmin ? BaseUrl.ADMIN : BaseUrl.CLIENT;
    }
}
