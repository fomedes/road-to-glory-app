import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SpanishPaginatorIntl } from 'src/app/Shared/spanish-paginator-intl';
import { PlayerDTO } from '../../models/player.dto';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent {
  players!: PlayerDTO[];
  page: number = 1;
  playerPrices!: any[];
  displayedColumns: string[] = [
    'playerId',
    'avatar',
    'name',
    'price',
    'overall',
    'country',
    'weakFoot',
    'skills',
    'positions',
    'currentClub',
  ];

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  totalItems: any;

  dataSource!: MatTableDataSource<PlayerDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private paginatorIntl: MatPaginatorIntl
  ) {
    this.paginatorIntl = new SpanishPaginatorIntl();
    this.loadPlayers();
  }

  private loadPlayers(): void {
    let errorResponse: any;

    this.playerService.getPlayerPrices().subscribe((playerPrices) => {
      this.playerPrices = playerPrices[0];
    });

    this.playerService.getPlayers().subscribe(
      (playersList) => {
        this.players = playersList;
        this.totalItems = playersList.length;
        this.page = 0;
        this.dataSource = new MatTableDataSource<PlayerDTO>(this.players);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        errorResponse = error.error;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
