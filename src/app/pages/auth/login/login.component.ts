import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GoogleApiService } from '../../../services/google-api.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessagesComponent } from '../../../components/error-messages/error-messages.component';

@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    ErrorMessagesComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private _location: Location,
    private readonly google: GoogleApiService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit() {
    if (!this.loginForm.valid) {
      console.log('first');
    }
    console.log(this.loginForm);
  }

  login() {
    this.google.login();
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) this._location.back();
    else {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(10)]],
      });
    }
  }
}
