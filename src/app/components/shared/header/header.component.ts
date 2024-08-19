import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { TeamDTO } from '../../../models/team.dto';
import { ToCurrencyPipe } from '../../../pipes/to-currency.pipe';
import { LocalStorageService } from '../../../services/local-storage.service';
import { SharedService } from '../../../services/shared.service';
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
    ToCurrencyPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  selectedValue: string = '';
  isMenuOpened: boolean = false;
  user_id: string = '';
  userClubs: any[] = [];
  currentTeam: any = {};
  currentTeamFullData: TeamDTO = new TeamDTO();
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private teamService: TeamService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.user_id = this.localStorageService.getItem('user').user_id;
    this.getUserClubs(this.user_id);
    this.subscription.add(
      this.sharedService.currentTeam$.subscribe((team) => {
        if (team) {
          this.currentTeamFullData = team;
          this.getCurrentTeam();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCurrentTeam() {
    this.currentTeam = this.localStorageService.getItem('currentTeam');
    this.getTeamData(this.currentTeam.teamId);
  }

  getTeamData(team_id: string) {
    this.teamService.getTeamById(team_id).subscribe((team) => {
      this.currentTeamFullData = team;
    });
  }

  changeCurrentClub(currentClub: any) {
    this.toggleMenu();
    this.sharedService.setCurrentTeam(currentClub);
    this.getCurrentTeam();
  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickOutside(): void {
    this.isMenuOpened = false;
  }

  private getUserClubs(user_id: string) {
    this.teamService.getTeamsByUser(user_id).subscribe((teams: any) => {
      this.userClubs = teams;
    });
  }
}
