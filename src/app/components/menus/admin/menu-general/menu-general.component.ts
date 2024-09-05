import { Component } from '@angular/core';
import { ReturnButtonComponent } from '../../../shared/return-button/return-button.component';

@Component({
  selector: 'app-menu-general',
  standalone: true,
  imports: [ReturnButtonComponent],
  templateUrl: './menu-general.component.html',
  styleUrl: './menu-general.component.scss'
})
export class MenuGeneralComponent {

}
