import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GoogleApiService } from '../../../services/google-api.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _location: Location,
    private readonly google: GoogleApiService
  ) {}

  login() {
    this.google.login();
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) this._location.back();
  }
}
