import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UpdatePriceDialogData } from '../domain/dialog-data';

@Component({
  selector: 'lib-update-price',
  templateUrl: './update-price.component.html',
  styleUrls: ['./update-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  standalone: true
})
export class UpdatePriceComponent {
  private readonly dialogRef = inject(MatDialogRef<UpdatePriceComponent>);
  private readonly data: UpdatePriceDialogData = inject(MAT_DIALOG_DATA);
  private readonly builder = inject(FormBuilder);

  readonly priceControl: FormControl<number> = this.builder.nonNullable.control<number>(this.data.price);

  get name(): string {
    return this.data.name;
  }

  updatePrice(): void {
    this.dialogRef.close(this.priceControl.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
