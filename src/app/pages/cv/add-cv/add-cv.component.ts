import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessagesComponent } from '../../../components/error-messages/error-messages.component';

@Component({
  selector: 'app-add-cv',
  imports: [ReactiveFormsModule, ErrorMessagesComponent],
  templateUrl: './add-cv.component.html',
  styleUrl: './add-cv.component.scss',
})
export class AddCvComponent {
  generalInfoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.generalInfoForm = this.formBuilder.group({
      first_name: ['', Validators.required, Validators.minLength(2)],
      last_name: ['', Validators.required, Validators.minLength(2)],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
