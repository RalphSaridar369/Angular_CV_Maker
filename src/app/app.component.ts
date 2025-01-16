import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { GoogleApiService } from './services/google-api.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { logout } from './states/auth/auth.action';
import { filter } from 'rxjs';

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
  email = '';

  constructor(private store: Store, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes:', changes);
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('user_auth')) {
      this.showHeader = true;
      const userAuth = sessionStorage.getItem('user_auth');
      let data: any;

      if (userAuth !== null) {
        data = JSON.parse(userAuth);
      }
      this.email = data.email;
    }

    // Dynamically update `showHeader` based on the current route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentRoute = event.urlAfterRedirects;
        console.log(currentRoute);
        // Hide header on specific routes, e.g., 'auth' route
        this.showHeader = !currentRoute.includes('/auth');
      });
  }

  logout() {
    this.store.dispatch(logout({ auth_user: null }));
    sessionStorage.removeItem('user_auth');
    this.router.navigate(['auth']);
  }
}
