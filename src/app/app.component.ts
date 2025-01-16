import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { GoogleApiService } from './services/google-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  providers: [
    OAuthService, // Add this line to register OAuthService
    GoogleApiService,
  ],
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showHeader: boolean = false; // Property to track header visibility
  title = 'cv-maker';

  ngOnInit(): void {
    if (sessionStorage.getItem('user_auth')) {
      console.log('change');
      this.showHeader = true;
    }
  }
}
