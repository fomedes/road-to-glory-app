import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-return-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './return-button.component.html',
  styleUrl: './return-button.component.scss'
})
export class ReturnButtonComponent {
  constructor(private location: Location) {}
  faArrowLeft = faArrowLeft;

  goBack(): void {
    this.location.back();
  }
}
