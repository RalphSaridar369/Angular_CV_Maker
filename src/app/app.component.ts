import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { GoogleApiService } from './services/google-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  providers: [
    OAuthService, // Add this line to register OAuthService
    GoogleApiService,
  ],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cv-maker';
}
