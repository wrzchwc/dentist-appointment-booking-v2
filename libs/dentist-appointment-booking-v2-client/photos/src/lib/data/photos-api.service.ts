import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ENVIRONMENT } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotosApiService {
  private readonly environment = inject(ENVIRONMENT);
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = this.environment.photoApiUrl;
  private readonly expressionInQuotes = new RegExp(/^"(.*)"$/);

  getPhotoUrl(key: string): Observable<string> {
    const expressionInQuotes = new RegExp(/^"(.*)"$/);
    return this.httpClient.post(
      `${this.baseUrl}/api/link`,
      { Key: `${key}.jpg` },
      { responseType: 'text' }
    ).pipe(
      map((response) => response.replace(expressionInQuotes, '$1'))
    );
  }
}
