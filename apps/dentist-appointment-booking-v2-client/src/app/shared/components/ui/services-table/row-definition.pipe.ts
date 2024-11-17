import { Pipe, PipeTransform } from '@angular/core';
import { DisplayedColumn } from './model';

@Pipe({
    name: 'rowDefinition',
    standalone: true,
})
export class RowDefinitionPipe implements PipeTransform {
    transform(values: DisplayedColumn[]): string[] {
        return values.map(({ property }) => property);
    }
}
