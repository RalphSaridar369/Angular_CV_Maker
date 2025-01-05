import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200',
  clientId:
    '872793502373-unvgvs45v6geqguvlsetqdkle0svjbs4.apps.googleusercontent.com',
  scope: 'openid profile email',
};

@Injectable({
  providedIn: 'root', // Automatically registers this service as a singleton provider
})
export class GoogleApiService {
  constructor(private oAuthService: OAuthService) {
    this.oAuthService.configure(oAuthConfig);
  }

  login() {
    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow();
        } else {
          this.oAuthService.loadUserProfile().then((userProfile) => {
            alert('logged in');
            console.log(JSON.stringify(userProfile));
          });
        }
      });
    });
  }
}
