import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faFileSignature,
  faHeart,
  faHeartCircleMinus,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { PlayerDTO } from '../../../models/player.dto';
import { ToCurrencyPipe } from '../../../pipes/to-currency.pipe';
import { CommunityService } from '../../../services/community.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { MarketService } from '../../../services/market.service';
import { NewsService } from '../../../services/news.service';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-market-players',
  standalone: true,
  imports: [CommonModule, ToCurrencyPipe, FontAwesomeModule],
  templateUrl: './market-players.component.html',
  styleUrl: './market-players.component.scss',
})
export class MarketPlayersComponent implements OnInit {
  faFileSignature = faFileSignature;
  faCartShopping = faCartShopping;
  faHeart = faHeart;
  faHeartCirclePlus = faHeartCirclePlus;
  faHeartCircleMinus = faHeartCircleMinus;

  playerDataFile = 'assets/data/players/players_test.json';
  playerPricesFile = 'assets/data/prices/player-prices.json';

  user: any = {};
  currentTeam: any = {};

  bidDetails: any;

  players: PlayerDTO[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  playerPrices: any[] = [];
  registeredPlayers: any[] = [];

  @Input() isFavourite: boolean = false;
  @Output() isFavouriteChange = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toaster: ToastrService,
    private playerService: PlayerService,
    private marketService: MarketService,
    private localStorageService: LocalStorageService,
    private newsService: NewsService,
    private communityService: CommunityService
  ) {}

  ngOnInit() {
    this.currentTeam = this.localStorageService.getItem('currentTeam');
    this.loadPlayerData();
    this.getPlayerPrices();
    this.user = this.localStorageService.getItem('user');
    this.getRegisteredPlayers();
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

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.players.length) {
      this.currentPage++;
      this.scrollToTop();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.scrollToTop();
    }
  }

  get totalPages() {
    return Math.ceil(this.players.length / this.itemsPerPage);
  }

  getPlayerPrices(): void {
    this.playerService.getPlayerPrices(this.playerPricesFile).subscribe({
      next: (data) => {
        this.playerPrices = data;
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

  public bidPlayer(player: PlayerDTO, bidAmount: number): void {
    this.getBidDetails(player, bidAmount);
    let responseOK: boolean = false;

    this.marketService
      .bidPlayer(this.bidDetails)
      .pipe(
        finalize(async () => {
          if (responseOK) {
            this.createNews();
            this.getRegisteredPlayers();
          }
        })
      )
      .subscribe({
        next: () => {
          responseOK = true;
          this.toaster.success(
            `Successfully bid ${bidAmount} € for ${player.name}`
          );
        },
        error: (error) => {
          this.toaster.error('Failed to bid on player');
        },
      });
  }

  getBidDetails(player: any, bidAmount: number) {
    this.bidDetails = {
      buyerId: this.user.user_id,
      buyerName: this.currentTeam.clubName,
      buyerCrest: this.currentTeam.clubCrest,
      playerId: player.player_id,
      playerName: player.name,
      bidAmount: bidAmount,
      communityId: this.currentTeam.communityId,
      teamId: this.currentTeam.teamId,
      type: 'transfer',
    };
  }

  public toggleSelected() {
    this.toaster.error('La herramienta de favoritos no está habilitada');

    // this.isFavourite = !this.isFavourite;
    // this.isFavouriteChange.emit(this.isFavourite);
  }

  createNews() {
    let responseOK: boolean = false;

    this.newsService
      .createNews(this.bidDetails)
      .pipe(
        finalize(async () => {
          if (responseOK) {
            this.bidDetails = {};
          }
        })
      )
      .subscribe({
        next: (response) => {
          responseOK = true;
        },
        error: (error: HttpErrorResponse) => {
          responseOK = false;
          console.error(error);
          this.toaster.error(
            'Ocurrió un error al elegir tu club. Inténtalo de nuevo.'
          );
        },
      });
  }

  getValueClass(value: string): string {
    if (Number(value) >= 85) {
      return 'value-high';
    } else if (Number(value) >= 70) {
      return 'value-medium';
    } else {
      return 'value-low';
    }
  }

  getRegisteredPlayers(): void {
    this.communityService
      .getRegisteredPlayers(this.currentTeam.communityId)
      .subscribe((players: any) => {
        this.registeredPlayers = players;
      });
  }

  isPlayerRegistered(playerId: string): string | null {
    const registeredPlayer = this.registeredPlayers.find(
      (player) => player.playerId === playerId
    );
    return registeredPlayer ? registeredPlayer.clubCrest : null;
  }
}
