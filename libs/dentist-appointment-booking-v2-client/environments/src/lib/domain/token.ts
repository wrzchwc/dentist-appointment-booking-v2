import { InjectionToken } from '@angular/core';
import { EnvironmentConfig } from './environment-config';

export const ENVIRONMENT = new InjectionToken<EnvironmentConfig>('environment');
