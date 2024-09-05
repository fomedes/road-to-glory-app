import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-community-settings',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './community-settings.component.html',
  styleUrl: './community-settings.component.scss'
})
export class CommunitySettingsComponent {
  communityId: string ='';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.communityId = params['communityId'];
    });
  }

}
