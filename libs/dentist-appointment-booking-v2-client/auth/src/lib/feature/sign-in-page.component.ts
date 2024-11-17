import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signIn } from '../data/auth.actions';

@Component({
  selector: 'lib-sign-in-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);

  readonly signInForm = this.formBuilder.group({
    email: this.formBuilder.nonNullable.control('', [
      Validators.required, Validators.email
    ]),
    password: this.formBuilder.nonNullable.control('', [
      Validators.required, Validators.minLength(8)
    ])
  });

  signIn() {
    this.store.dispatch(signIn({
      request: {
        email: this.signInForm.controls['email'].value,
        password: this.signInForm.controls['password'].value
      }
    }));
  }
}
