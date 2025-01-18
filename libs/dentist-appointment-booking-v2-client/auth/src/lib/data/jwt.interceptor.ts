import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { catchError, iif, Observable, switchMap, tap, throwError } from 'rxjs';
import { computed, inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { accessToken, identityToken, refreshToken } from './auth.selectors';
import { AuthApiService } from './auth-api.service';
import { refreshTokens } from './auth.actions';
import { ENVIRONMENT } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/environments';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly store = inject(Store);
  private readonly authService = inject(AuthApiService);
  private readonly environment = inject(ENVIRONMENT);

  private readonly refreshTokenFromStore = this.store.selectSignal(refreshToken);
  private readonly accessToken = this.store.selectSignal(accessToken);
  private readonly identityToken = this.store.selectSignal(identityToken);

  private readonly refreshToken = computed(() => this.refreshTokenFromStore() || '');

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.includeToken(request, this.accessToken(), this.identityToken())).pipe(
      catchError((error) => iif(
        () => error.status === HttpStatusCode.Forbidden,
        this.refreshTokens(request, next),
        throwError(() => error))
      )
    );
  }

  private refreshTokens(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshTokens(this.refreshToken()).pipe(
      tap((response) => this.store.dispatch((refreshTokens(response)))),
      switchMap(({ accessToken, identityToken }) =>
        next.handle(this.includeToken(request, accessToken, identityToken))
      ),
      catchError((error) => throwError(() => error))
    );
  }

  private includeToken(request: HttpRequest<any>, accessToken: string | undefined, identityToken: string | undefined): HttpRequest<any> {
    if (!(accessToken || identityToken) || request.url.includes('refresh-tokens')) {
      return request;
    } else if (request.url.includes(this.environment.photoApiUrl)) {
      return request.clone({ setHeaders: { Authorization: `Bearer ${identityToken}` } });
    }
    return request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
  }
}
