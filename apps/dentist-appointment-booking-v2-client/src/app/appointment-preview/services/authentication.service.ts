import { Injectable } from '@angular/core';

interface Profile {
  readonly id: string;
  readonly isAdmin: boolean;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly photoUrl: string;
}


@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    profile?: Profile;


    get isAdmin(): boolean {
        return !!this.profile?.isAdmin;
    }
}
