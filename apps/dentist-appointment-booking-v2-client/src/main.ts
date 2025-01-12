import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/environments';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch(console.error);
