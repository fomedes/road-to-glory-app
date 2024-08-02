import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { LocalStorageService } from '../../../services/local-storage.service';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatSelectModule,
    CommonModule,
    ClickOutsideDirective,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  selectedValue: string = '';
  isMenuOpened: boolean = false;
  user_id: string = '';
  userClubs: any[] = [];

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.user_id = this.localStorageService.getItem('user').user_id;
    this.getUserClubs(this.user_id);
  }

  onSelectionChange(selectedValue: string) {
    this.router.navigate([selectedValue]);
  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickOutside(): void {
    this.isMenuOpened = false;
  }

  private getUserClubs(user_id: string) {
    this.teamService.getByUser(user_id).subscribe((teams: any) => {
      this.userClubs = teams.map((team: any) => ({
        team_id: team.teamId,
        team_name: team.teamName,
        team_crest: team.teamCrest,
        community_id: team.communityId,
      }));
      console.log(this.userClubs);
    });
  }
}
