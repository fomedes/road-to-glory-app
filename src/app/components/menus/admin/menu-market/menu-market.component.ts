import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReturnButtonComponent } from '../../../shared/return-button/return-button.component';

@Component({
  selector: 'app-menu-market',
  standalone: true,
  imports: [ReturnButtonComponent, RouterModule],
  templateUrl: './menu-market.component.html',
  styleUrl: './menu-market.component.scss'
})
export class MenuMarketComponent {
  communityId: string = '';
  communityData: any = {};

  constructor ( private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.communityData = navigation.extras.state['communityData'];
    }
  }

}
