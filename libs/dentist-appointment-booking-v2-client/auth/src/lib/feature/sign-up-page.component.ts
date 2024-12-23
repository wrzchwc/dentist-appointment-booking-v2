import { ChangeDetectionStrategy, Component, computed, effect, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserStore } from '../data/user.store';
import { confirmSignUp } from '../data/auth.actions';

@Component({
  selector: 'lib-sign-up-page',
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
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserStore]
})
export class SignUpPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly userStore = inject(UserStore);

  private readonly userId: Signal<string | undefined> = this.userStore.userId;
  readonly confirmationCodeSent = computed(() => !!this.userId());
  readonly disableEmail = effect(() => {
    if(this.confirmationCodeSent()) {
      this.signUpForm.controls['email'].disable();
    }
  })

  readonly signUpForm = this.formBuilder.group({
    firstName: this.formBuilder.nonNullable.control('', [
      Validators.required
    ]),
    lastName: this.formBuilder.nonNullable.control('', [
      Validators.required
    ]),
    photoUrl: this.formBuilder.nonNullable.control(''),
    confirmationCode: this.formBuilder.nonNullable.control('', [
      Validators.required, Validators.minLength(6)
    ]),
    email: this.formBuilder.nonNullable.control('', [
      Validators.required, Validators.email
    ]),
    password: this.formBuilder.nonNullable.control('', [
      Validators.required, Validators.minLength(8)
    ])
  });

  get disableSignUpButton() {
    const { controls } = this.signUpForm;
    return controls['email'].invalid || controls['password'].invalid;
  }

  signUp() {
    this.userStore.signUp({
      email: this.signUpForm.controls['email'].value,
      password: this.signUpForm.controls['password'].value
    });
  }

  confirmSignUp() {
    this.store.dispatch(confirmSignUp({
      request: {
        email: this.signUpForm.controls['email'].value,
        firstName: this.signUpForm.controls['firstName'].value,
        lastName: this.signUpForm.controls['lastName'].value,
        photoUrl: this.signUpForm.controls['photoUrl'].value,
        confirmationCode: this.signUpForm.controls['confirmationCode'].value,
        userId: this.userId() || ''
      }
    }))
  }
}
