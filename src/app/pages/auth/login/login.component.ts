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
import { Store } from '@ngrx/store';
import { ErrorMessagesComponent } from '../../../components/error-messages/error-messages.component';
import { getUserAuth } from '../../../states/auth/auth.selector';
import { login, logout } from '../../../states/auth/auth.action';

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
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) this._location.back();
    else {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(10)]],
      });
    }
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      console.log('first');
    }
    this.store.dispatch(
      login({ auth_user: { email: this.loginForm.get('email')?.value } })
    );

    sessionStorage.setItem(
      'user_auth',
      JSON.stringify({
        email: this.loginForm.get('email')?.value,
      })
    );

    this.store.select(getUserAuth).subscribe((state) => {
      console.log('Current Counter State:', state);
    });
  }

  login() {
    this.google.login();
  }
}
