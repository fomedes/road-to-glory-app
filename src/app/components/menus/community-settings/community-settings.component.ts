import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-community-settings',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './community-settings.component.html',
  styleUrl: './community-settings.component.scss'
})
export class CommunitySettingsComponent {
  communityId: string ='';
  communityData: any = {};

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.communityId = params['communityId'];
    });
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.communityData = navigation.extras.state['communityData'];
    }
  }

}
