import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PlayerDTO } from '../../models/player.dto';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubComponent {
  players!: PlayerDTO[];
  clubPlayers: any[] = [];
  playerIds!: number[];

  playerPrices!: any[];
  displayedColumns: string[] = [
    'playerId',
    'avatar',
    'positions',
    'name',
    'price',
    'overall',
    'weakFoot',
    'skills',
    'sell',
    'transfer',
  ];

  dataSource!: MatTableDataSource<PlayerDTO>;

  constructor(private playerService: PlayerService, private router: Router) {
    this.loadClub();
  }

  private loadClub(): void {
    let errorResponse: any;

    //load prices
    this.playerService.getPlayerPrices().subscribe((playerPrices) => {
      this.playerPrices = playerPrices[0]; //comunity at position 0
    });

    this.getClubPlayers();
  }

  private getClubPlayers() {
    let errorResponse: any;

    this.playerService.getClubPlayersByUser().subscribe((resp) => {
      this.playerIds = JSON.parse(resp.club_players);
      for (let id of this.playerIds) {
        this.playerService.getPlayerById(id).subscribe(
          (player) => {
            this.clubPlayers.push(player);
            this.dataSource = new MatTableDataSource<PlayerDTO>(
              this.clubPlayers
            );
          },
          (error: any) => {
            errorResponse = error.error;
          }
        );
      }
    });
  }

  sellPlayer(): void {
    console.log('Jugador vendido');
  }

  transferable(): void {
    console.log('Jugador añadido a transferibles');
  }
}
