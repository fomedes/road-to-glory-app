import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/Shared/services/header-menus.dto';
import { HeaderMenusService } from 'src/app/Shared/services/header-menus.service';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { TeamDTO } from '../../models/team.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  teams: TeamDTO[] = [
    {
      position: 1,
      name: 'Team A',
      played: 10,
      won: 8,
      drawn: 1,
      lost: 1,
      points: 25,
    },
    {
      position: 2,
      name: 'Team B',
      played: 10,
      won: 7,
      drawn: 1,
      lost: 2,
      points: 22,
    },
    {
      position: 3,
      name: 'Team C',
      played: 10,
      won: 6,
      drawn: 2,
      lost: 2,
      points: 20,
    },
    {
      position: 4,
      name: 'Team D',
      played: 10,
      won: 6,
      drawn: 2,
      lost: 2,
      points: 20,
    },
    {
      position: 5,
      name: 'Team E',
      played: 10,
      won: 5,
      drawn: 3,
      lost: 2,
      points: 18,
    },
    {
      position: 6,
      name: 'Team F',
      played: 10,
      won: 4,
      drawn: 4,
      lost: 2,
      points: 16,
    },
    {
      position: 7,
      name: 'Team G',
      played: 10,
      won: 4,
      drawn: 3,
      lost: 3,
      points: 15,
    },
    {
      position: 8,
      name: 'Team H',
      played: 10,
      won: 3,
      drawn: 4,
      lost: 3,
      points: 13,
    },
    {
      position: 9,
      name: 'Team I',
      played: 10,
      won: 2,
      drawn: 5,
      lost: 3,
      points: 11,
    },
    {
      position: 10,
      name: 'Team J',
      played: 10,
      won: 1,
      drawn: 3,
      lost: 6,
      points: 6,
    },
  ];

  showAuthSection: boolean;
  showNoAuthSection: boolean;

  constructor(
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService
  ) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
  }

  ngOnInit(): void {
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showAuthSection = headerInfo.showAuthSection;
          this.showNoAuthSection = headerInfo.showNoAuthSection;
        }
      }
    );
  }

  navigationTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
