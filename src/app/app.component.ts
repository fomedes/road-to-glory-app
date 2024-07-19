import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule,
    MatIconModule,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'road-to-glory';
  constructor(public router: Router) {}

  isValid(): boolean {
    if (
      this.router.url != '/' &&
      this.router.url != '/forget-password' &&
      this.router.url != '/reset-password/:email_for/:token_for'
    ) {
      return true;
    }
    return false;
  }
}
