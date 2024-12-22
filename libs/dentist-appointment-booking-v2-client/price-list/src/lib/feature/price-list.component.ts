import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdatePriceComponent } from '../ui/update-price.component';
import { filter, map, switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ServiceDAO } from '@dentist-appointment-booking-v2/shared/services';
import {
  AppointmentTimesPipe,
  ServicesApiService,
  TooltipPipe
} from '@dentist-appointment-booking-v2/dentist-appointment-booking-v2-client/services';
import { ServicesStore } from '../data/services.store';

@Component({
  selector: 'lib-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    AppointmentTimesPipe,
    MatButtonModule,
    TooltipPipe
  ],
  standalone: true,
  providers: [ServicesStore]
})
export class PriceListComponent {
  private readonly matDialog = inject(MatDialog);
  private readonly servicesApiService = inject(ServicesApiService);
  private readonly servicesStore = inject(ServicesStore);

  readonly services: Signal<ServiceDAO[]> = this.servicesStore.services;

  private readonly dialogConfig: MatDialogConfig = { autoFocus: true };

  handlePriceUpdate(service: ServiceDAO): void {
    this.dialogConfig.data = { name: service.name, price: service.price };
    this.matDialog
      .open(UpdatePriceComponent, this.dialogConfig)
      .afterClosed()
      .pipe(
        filter((value) => typeof value === 'number'),
        switchMap((price) =>
          this.servicesApiService.updateService(service.id, { price }).pipe(map(() => price))
        )
      )
      .subscribe((price) => {
        this.servicesStore.updateService(service.id, { price });
      });
  }
}
