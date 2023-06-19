import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MarketService } from 'src/app/Market/services/market.service';
import { PlayerDTO } from '../../models/player.dto';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubComponent {
  @ViewChild('bidOverlay') sellOverlay!: TemplateRef<any>;

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
  player: any;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private marketService: MarketService,
    private playerService: PlayerService,
    private dialog: MatDialog,
    private router: Router
  ) {
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
      const responsePlayers = resp.club_players;

      this.playerIds = Array.isArray(responsePlayers)
        ? responsePlayers
        : JSON.parse(responsePlayers);

      console.log(`resp => ${resp}`);
      console.log(`response => ${responsePlayers}`);
      console.log(`playerId => ${this.playerIds}`);

      for (let id of this.playerIds) {
        this.playerService.getPlayerById(id).subscribe(
          (player) => {
            this.clubPlayers.push(player);
            this.dataSource = new MatTableDataSource<PlayerDTO>(
              this.clubPlayers
            );
            console.log(`player => ${player}`);
            console.log(`clubPlayer => ${this.clubPlayers}`);
            console.log(`datasource => ${this.dataSource}`);
          },
          (error: any) => {
            errorResponse = error.error;
          }
        );
      }
    });
  }

  // Overlay methods

  public sellPlayerOverlay(player: any): void {
    this.player = player;
    this.player.short_name = player.short_name;
    this.player.price = this.playerPrices[player.overall];
    this.dialogRef = this.dialog.open(this.sellOverlay, {
      width: '300px',
      height: '450px',
      disableClose: true,
    });
  }

  public sellPlayer(player: PlayerDTO) {
    const user_id = localStorage.getItem('user_id');

    const sellData: any = {
      player_id: player.id,
      selling_club: user_id,
      selling_amount: this.playerPrices[player.overall],
      selling_date: new Date(),
    };

    this.marketService.bidPlayer(sellData).subscribe(
      (response) => {
        console.log('Bid placed succesfully:', response);
        // Close Overlay and reset form
        this.dialogRef.close();
      },
      (error) => {
        console.error('Bid placement error:', error);
      }
    );
  }

  public closeOverlay(dialogRef: MatDialogRef<any>) {
    dialogRef.close();
  }
}
