import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cancelable',
    standalone: true,
})
export class CancelablePipe implements PipeTransform {
    transform(value: string): boolean {
      //todo: should return if current date appt start date
        return true;
    }
}
