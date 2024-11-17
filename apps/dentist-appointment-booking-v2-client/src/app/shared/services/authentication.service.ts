import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '../model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private readonly baseUrl: string = `${environment.apiUrl}/api`;

    profile?: Profile;
    readonly authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private client: HttpClient) {}

    getProfile(): Observable<Profile> {
        return this.client.get<Profile>(`${this.baseUrl}/users/me`);
    }

    get isAdmin(): boolean {
        return !!this.profile?.isAdmin;
    }
}
