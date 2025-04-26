import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
import { AddCvComponent } from './pages/cv/add-cv/add-cv.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'cv/add', component: AddCvComponent },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'change-password', component: ChangePasswordComponent },
    ],
  },
];
