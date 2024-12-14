import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
    name: 'endDate',
    standalone: true,
})
export class EndDatePipe implements PipeTransform {
    transform(value: string, length: number): Date {
        return DateTime.fromISO(value).plus({ minute: length }).toJSDate();
    }
}
