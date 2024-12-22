import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DisplayedColumn } from '../domain/displayed-column';
import { NamedPriceItem } from '../domain/price-item';
import { UpperCasePipe } from '@angular/common';
import { RowDefinitionPipe } from './row-definition.pipe';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'lib-services-table',
  templateUrl: 'services-table.component.html',
  styleUrls: ['./services-table.component.scss'],
  standalone: true,
  imports: [RowDefinitionPipe, MatTableModule, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesTableComponent {
  readonly dataSource = input<NamedPriceItem[]>([]);

  readonly displayedColumns: DisplayedColumn[] = [
    { label: 'usługa', property: 'name' },
    { label: 'liczba', property: 'quantity' },
    { label: 'wartość', property: 'price' }
  ];
}
