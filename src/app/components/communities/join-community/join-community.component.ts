import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { CommunityDTO } from '../../../models/community.dto';
import { CommunityService } from '../../../services/community.service';

@Component({
  selector: 'app-join-community',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './join-community.component.html',
  styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'isPrivate',
    'communityPlatforms',
    'minOvr',
    'maxOvr',
    'action',
  ];

  communities: any[] = [];

  constructor(
    private communityService: CommunityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.communityService.getAllCommunities().subscribe((data) => {
      this.communities = data;
    });
  }

  joinCommunity(community: CommunityDTO): void {
    this.router.navigate(['/choose-club'], { state: { community } });
  }
}
