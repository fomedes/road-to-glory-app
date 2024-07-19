import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatSelectModule,
    CommonModule,
    ClickOutsideDirective,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  selectedValue: string = '';
  isMenuOpened: boolean = false;

  constructor(private router: Router) {}
  userClubs = ['Club 1', 'Club 2', 'Club 3', 'Club 4', 'Club 5'];

  onSelectionChange(selectedValue: string) {
    this.router.navigate([selectedValue]);
  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickOutside(): void {
    this.isMenuOpened = false;
  }
}
