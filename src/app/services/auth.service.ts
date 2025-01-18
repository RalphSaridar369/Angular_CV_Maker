import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { login } from '../states/auth/auth.action';
import { getUserAuth } from '../states/auth/auth.selector';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email: BehaviorSubject<string> = new BehaviorSubject<string>(
    sessionStorage.getItem('user_auth')
      ? JSON.parse(sessionStorage.getItem('user_auth')!).email
      : ''
  );

  constructor(private store: Store, private router: Router) {}

  login(email: string) {
    this.store.dispatch(login({ auth_user: { email: email } }));

    sessionStorage.setItem(
      'user_auth',
      JSON.stringify({
        email: email,
      })
    );

    this.store.select(getUserAuth).subscribe((state) => {
      console.log('Current Counter State:', state);
    });

    this.email.next(email);

    this.router.navigate(['']);
  }
}
