import { Component, OnInit } from '@angular/core';
// import { CommunityComponent } from './community.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, MatButton],
})
export class HomeComponent implements OnInit {
  joinedCommunities: any[] = []; // Replace with actual data fetching

  constructor(private communityService: CommunityService) {}

  ngOnInit() {
    this.loadJoinedCommunities();
  }

  loadJoinedCommunities() {
    this.communityService.getJoinedCommunities().subscribe((communities) => {
      this.joinedCommunities = communities;
    });
    console.log(this.joinedCommunities);
  }
}
