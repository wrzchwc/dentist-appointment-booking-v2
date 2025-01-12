import { Injectable } from '@angular/core';
import { environment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/environments';


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
    getBaseUrl(isAdmin: boolean): string {
        return isAdmin ? BaseUrl.ADMIN : BaseUrl.CLIENT;
    }
}
