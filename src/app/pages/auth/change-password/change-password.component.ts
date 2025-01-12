import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorMessagesComponent } from '../../../components/error-messages/error-messages.component';

@Component({
  selector: 'app-change-password',
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    ErrorMessagesComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    if (!this.changePasswordForm.valid) {
      console.log('first');
    }
    console.log(this.changePasswordForm);
  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator('password', 'confirmPassword') } // Apply the custom validator
    );
  }

  passwordMatchValidator(
    password: string,
    confirmPassword: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null; // Skip validation if controls are missing
      }

      const isMatch = passwordControl.value === confirmPasswordControl.value;
      return isMatch ? null : { passwordMismatch: true }; // Return error if not matching
    };
  }
}
