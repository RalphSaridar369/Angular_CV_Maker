import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // data: any[] = [
  //   { title: 'CV' },
  //   { title: 'CV' },
  //   { title: 'CV' },
  //   { title: 'CV' },
  //   { title: 'CV' },
  //   { title: 'CV' },
  //   { title: 'CV' },
  // ];
  data: any[] = [];
}
