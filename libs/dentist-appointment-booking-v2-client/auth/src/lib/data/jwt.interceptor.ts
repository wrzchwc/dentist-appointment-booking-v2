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
import { accessToken, refreshToken } from './auth.selectors';
import { AuthApiService } from './auth-api.service';
import { refreshTokens } from './auth.actions';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly store = inject(Store);
  private readonly authService = inject(AuthApiService);

  private readonly refreshTokenFromStore = this.store.selectSignal(refreshToken);
  private readonly accessToken = this.store.selectSignal(accessToken);

  private readonly refreshToken = computed(() => this.refreshTokenFromStore() || '');

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.includeToken(request, this.accessToken())).pipe(
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
      switchMap(({ accessToken }) => next.handle(this.includeToken(request, accessToken))),
      catchError((error) => throwError(() => error))
    );
  }

  private includeToken(request: HttpRequest<any>, accessToken: string | undefined): HttpRequest<any> {
    if (!accessToken || request.url.includes('refresh-tokens')) {
      return request;
    }
    return request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
  }
}
