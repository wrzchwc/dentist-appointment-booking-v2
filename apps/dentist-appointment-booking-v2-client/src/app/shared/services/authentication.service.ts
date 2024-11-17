import { Injectable } from '@angular/core';

import { Profile } from '../model';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    profile?: Profile;


    get isAdmin(): boolean {
        return !!this.profile?.isAdmin;
    }
}
