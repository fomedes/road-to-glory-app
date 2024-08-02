import { Component, OnInit } from '@angular/core';
// import { CommunityComponent } from './community.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommunityDTO } from '../../models/community.dto';
import { AuthService } from '../../services/auth.service';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, MatButton],
})
export class HomeComponent implements OnInit {
  userCommunities: any[] = [];
  user_id = '';

  constructor(
    private communityService: CommunityService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user_id = this.authService.getUserId()!;
    this.loadUserCommunities();
  }

  loadUserCommunities() {
    this.communityService
      .getUserCommunities(this.user_id)
      .subscribe((communities: CommunityDTO[]) => {
        this.userCommunities = communities.map((community) => ({
          id: community.id,
          name: community.name,
        }));
      });
  }
}
