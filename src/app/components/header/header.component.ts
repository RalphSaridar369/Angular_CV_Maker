import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { logout } from '../../states/auth/auth.action';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  email = '';

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('header');
    this.authService.email.subscribe((data) => {
      console.log('data:', data);
      this.email = data;
    });
  }
  logout() {
    this.store.dispatch(logout({ auth_user: null }));
    sessionStorage.removeItem('user_auth');
    this.authService.email.next('');
    this.router.navigate(['auth']);
  }
}
