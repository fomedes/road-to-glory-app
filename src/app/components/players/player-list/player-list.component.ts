import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { PlayerDTO } from '../../../models/player.dto';
import { ToCurrencyPipe } from '../../../pipes/to-currency.pipe';
import { PlayerService } from '../../../services/player.service';
CommonModule;

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule, ToCurrencyPipe, MatIcon],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  playerDataFile = 'assets/data/players/players_test.json';
  playerPricesFile = 'assets/data/prices/player-prices.json';

  players: PlayerDTO[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  playerPrices: any[] = [];

  @Input() isFavourite: boolean = false;
  @Output() isFavouriteChange = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toaster: ToastrService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.loadPlayerData();
    this.getPlayerPrices();
  }

  loadPlayerData() {
    this.playerService.getPlayers(this.playerDataFile).subscribe({
      next: (data) => {
        this.players = data;
      },
      error: (error) => {
        this.toaster.error('Failed to load player data');
      },
    });
  }

  get paginatedPlayers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.players.slice(start, end);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.players.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages() {
    return Math.ceil(this.players.length / this.itemsPerPage);
  }

  getPlayerPrices() {
    this.playerService.getPlayerPrices(this.playerPricesFile).subscribe({
      next: (data) => {
        this.playerPrices = data;
        console.log(this.playerPrices);
      },
      error: (error) => {
        this.toaster.error('Failed to load player player prices');
      },
    });
  }

  public getPlayerCost(ovr: string): number {
    const priceObj = this.playerPrices.find(
      (price) => price.ovr === Number(ovr)
    );
    return priceObj ? priceObj.price : 0;
  }

  public bidPlayer(player: PlayerDTO) {
    this.toaster.success(`Bidding for ${player.name}`);
  }

  public toggleSelected() {
    this.isFavourite = !this.isFavourite;
    this.isFavouriteChange.emit(this.isFavourite);
  }
}
