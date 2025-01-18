import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ENVIRONMENT } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/environments';
import { HttpClient } from '@angular/common/http';
import { UploadPhotoResponse } from '@dentist-appointment-booking-v2/shared/photos';

@Injectable({
  providedIn: 'root'
})
export class PhotosApiService {
  private readonly environment = inject(ENVIRONMENT);
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = this.environment.photoApiUrl;

  getPhotoUrl(key: string): Observable<string> {
    const expressionInQuotes = new RegExp(/^"(.*)"$/);
    return this.httpClient.post(
      `${this.baseUrl}/api/link`,
      { Key: this.transformKey(key) },
      { responseType: 'text' }
    ).pipe(
      map((response) => response.replace(expressionInQuotes, '$1'))
    );
  }

  uploadPhoto(key: string, photo: File): Observable<UploadPhotoResponse> {
    return this.readFileAsBase64(photo).pipe(
      map((imageBase64) => imageBase64.split(',')[1]),
      switchMap((imageBase64) =>
        this.httpClient.post<UploadPhotoResponse>(
          `${this.baseUrl}/api/upload`,
          {
            key: this.transformKey(key),
            imageBase64
          }
        )
      )
    )
  }

  private transformKey(key: string): string {
    return `${key}.jpg`;
  }

  private readFileAsBase64(file: File): Observable<string> {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        observer.next(reader.result as string);
        observer.complete();
      }
      reader.onerror = (error) => {
        observer.error(error);
      }
      reader.readAsDataURL(file);
    })
  }
}
