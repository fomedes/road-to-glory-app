import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReturnButtonComponent } from '../../../shared/return-button/return-button.component';

@Component({
  selector: 'app-menu-teams',
  standalone: true,
  imports: [ReturnButtonComponent, RouterModule],
  templateUrl: './menu-teams.component.html',
  styleUrl: './menu-teams.component.scss'
})
export class MenuTeamsComponent {
  communityId: string = '';
  communityData: any = {};

  constructor ( private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.communityData = navigation.extras.state['communityData'];
    }
  }
}
