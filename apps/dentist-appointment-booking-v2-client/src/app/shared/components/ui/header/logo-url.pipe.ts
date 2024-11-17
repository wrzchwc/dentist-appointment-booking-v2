import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';

@Pipe({
    name: 'logoUrl',
    standalone: true,
})
export class LogoUrlPipe implements PipeTransform {
    transform(isAuthenticated: boolean): string {
      return isAuthenticated ? '/' : '/appointment-preview';
    }
}
