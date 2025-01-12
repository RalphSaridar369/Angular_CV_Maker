import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorMessagesComponent } from '../../../components/error-messages/error-messages.component';

@Component({
  selector: 'app-reset-password',
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    ErrorMessagesComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(10)],
      ],
    });
  }

  get emailError(): string | null {
    const control = this.resetPasswordForm.get('email');
    console.log('first'); // Logs only when the getter is accessed
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return null; // No errors
  }

  onSubmit() {
    if (!this.resetPasswordForm.valid) {
      console.log('first');
    }
    console.log(this.resetPasswordForm);
    console.log(this.resetPasswordForm.get('email'));
  }
}
