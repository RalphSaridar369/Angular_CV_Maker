import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  constructor(private router: Router) {} // Inject Router service

  ngOnInit(): void {
    if (sessionStorage.getItem('user_auth')) {
      this.router.navigate(['home']);
    }
  }
}
