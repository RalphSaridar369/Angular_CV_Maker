import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { authReducer } from './states/auth/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ auth_user: authReducer }),
    provideEffects([]), // Add effects here if needed
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideOAuthClient(),
    provideHttpClient(),
  ],
};
