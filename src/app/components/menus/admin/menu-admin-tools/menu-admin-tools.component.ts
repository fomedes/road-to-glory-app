import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReturnButtonComponent } from '../../../shared/return-button/return-button.component';

@Component({
  selector: 'app-menu-admin-tools',
  standalone: true,
  imports: [ReturnButtonComponent, RouterModule],
  templateUrl: './menu-admin-tools.component.html',
  styleUrl: './menu-admin-tools.component.scss'
})
export class MenuAdminToolsComponent {
  communityId: string = '';
  communityData: any = {};

  constructor ( private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.communityData = navigation.extras.state['communityData'];
    }
  }
}
