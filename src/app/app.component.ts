import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { GoogleApiService } from './services/google-api.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { logout } from './states/auth/auth.action';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
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
  authService: AuthService;

  constructor(
    private store: Store,
    private router: Router,
    authService: AuthService
  ) {
    this.authService = authService;
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('user_auth')) {
      this.showHeader = true;
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentRoute = event.urlAfterRedirects;
        console.log(currentRoute);
        // Hide header on specific routes, e.g., 'auth' route
        this.showHeader = !currentRoute.includes('/auth');
      });
  }
}
