import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommunityService } from '../../../services/community.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { PlayerService } from '../../../services/player.service';
import { TeamService } from '../../../services/team.service';
import { ClubPlayersComponent } from '../club-players/club-players.component';

@Component({
  selector: 'app-club-page',
  standalone: true,
  imports: [CommonModule, ClubPlayersComponent],
  templateUrl: './club-page.component.html',
  styleUrl: './club-page.component.scss',
})
export class ClubPageComponent implements OnInit {
  playerDataFile = '';

  teamPlayerIds: any[] = [];
  teamPlayers: any[] = [];
  teamId: string = '';
  currentTeam: any = {};

  constructor(
    private teamService: TeamService,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private playerService: PlayerService,
    private toaster: ToastrService,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    this.currentTeam = this.localStorageService.getItem('currentTeam');
    this.getMarketConfig();
    this.getTeamPlayers();
  }

  getMarketConfig(): void {
    this.communityService.getMarketConfig(this.currentTeam.communityId).subscribe({
      next: (data) => {
        this.playerDataFile = data.playerDatabase;
      },
      error: (error) => {
        this.toaster.error('Failed to load market config');
      },
    });
  }
  
  getTeamPlayers() {
    this.teamService
      .getTeamPlayers(this.currentTeam.teamId)
      .subscribe((data) => {
        this.teamPlayerIds = data;
        this.loadPlayerData();
      });
  }

  loadPlayerData() {
    this.http.get<any[]>(this.playerDataFile).subscribe((players) => {
      this.teamPlayers = players.filter((player) =>
        this.teamPlayerIds.includes(player.player_id)
      );
    });
  }

  sellPlayer(playerId: string) {
    this.toaster.error('Esta acción no está habilitada');

    // this.playerService
    //   .sellPlayer(this.currentTeam.teamId, playerId)
    //   .subscribe();
  }
}
