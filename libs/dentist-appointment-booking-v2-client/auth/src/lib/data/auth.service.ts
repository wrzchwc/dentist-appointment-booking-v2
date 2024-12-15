import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UserProfile,
  SignInResponse,
  SignUpRequest,
  RefreshTokenResponse
} from '@dentist-appointment-booking-v2/shared/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = '/api/auth';

  signIn(request: SignUpRequest): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(`${this.baseUrl}/sign-in`, request);
  }

  signOut(): Observable<string> {
    return this.httpClient.post(
      `${this.baseUrl}/sign-out`,
      null,
      { responseType: 'text' });
  }

  getCurrentUserProfile(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(`${this.baseUrl}/me`);
  }

  refreshTokens(refreshToken: string): Observable<RefreshTokenResponse> {
    return this.httpClient.post<RefreshTokenResponse>(`${this.baseUrl}/refresh-tokens`, {refreshToken});
  }
}
