import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInResponse, SignUpRequest } from '@dentist-appointment-booking-v2/shared/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = '/api/auth'

  signIn(request: SignUpRequest): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(`${this.baseUrl}/sign-in`, request);
  }

  signOut(accessToken: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });
    return this.httpClient.post(
      `${this.baseUrl}/sign-out`,
      null,
      {headers, responseType: 'text' });
  }

  getCurrentUserProfile(accessToken: string): Observable<object> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });
    return this.httpClient.get<object>(`${this.baseUrl}/me`, {headers});
  }
}
