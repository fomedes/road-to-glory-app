import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faCartShopping,
  faFileSignature,
  faHeartCircleMinus,
  faHeartCirclePlus,
  faHeart as solidHeart,
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
import { SharedService } from '../../../services/shared.service';
import { TeamService } from '../../../services/team.service';
import { FavouritePlayersComponent } from '../favourite-players/favourite-players.component';

@Component({
  selector: 'app-market-players',
  standalone: true,
  imports: [CommonModule, ToCurrencyPipe, FontAwesomeModule, FormsModule, MatInputModule, FavouritePlayersComponent],
  templateUrl: './market-players.component.html',
  styleUrl: './market-players.component.scss',
})
export class MarketPlayersComponent implements OnInit {
  faFileSignature = faFileSignature;
  faCartShopping = faCartShopping;
  faHeart = faHeart;
  faSolidHeart = solidHeart;
  faHeartCirclePlus = faHeartCirclePlus;
  faHeartCircleMinus = faHeartCircleMinus;

  playerDataFile: string = '';
  playerPricesFile = 'assets/data/prices/player-prices.json';
  freeAgent: any = {
    freeAgentId: '66c76ea075bb6f00380323af',
    freeAgentName: 'Free Agent',
    freeAgentCrest: 'assets/images/others/free_agent_crest.png',
  }


  user: any = {};
  currentTeam: any = {};

  bidDetails: any;

  players: PlayerDTO[] = [];
  paginatedPlayers: PlayerDTO[] = [];
  filteredPlayers: PlayerDTO[] = [];
  registeredPlayers: any[] = [];
  favoritePlayers: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  
  searchQuery: string = '';

  playerPrices: any[] = [];
  displayFavorites: boolean = false;

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
    private communityService: CommunityService,
    private teamService: TeamService,
    private sharedService: SharedService,
  ) {}

  ngOnInit() {
    this.currentTeam = this.localStorageService.getItem('currentTeam');
    this.loadFavorites();
    this.getMarketConfig();
    this.getPlayerPrices();
    this.user = this.localStorageService.getItem('user');
    this.getRegisteredPlayers();
  }

  loadFavorites() {
    const teamId = this.currentTeam.teamId;
    this.teamService.getFavouritePlayers(teamId).subscribe({
      next: (data) => {
        this.favoritePlayers = data
      },
      error: (error) => {
        this.toaster.error('Failed to load favorite players');
      },
    });
  }

  toggleFavorite(player: PlayerDTO) {
    const teamId = this.currentTeam.teamId;
    const playerId = player.playerId;
    const index = this.favoritePlayers.indexOf(playerId);

    if (index !== -1) {
      this.teamService.removePlayerFromFavourites(teamId, playerId).subscribe({
        next: () => {
          this.favoritePlayers.splice(index, 1);
          this.toaster.success(`${player.name} removed from favorites`);
          if (this.displayFavorites) {
            this.filterPlayersByFavorites();
          }
        },
        error: (error) => {
          this.toaster.error('Failed to remove player from favorites');
        },
      });
    } else {
      this.teamService.addPlayerToFavourites(teamId, playerId).subscribe({
        next: () => {
          this.favoritePlayers.push(playerId);
          this.toaster.success(`${player.name} added to favorites`);
          if (this.displayFavorites) {
            this.filterPlayersByFavorites();
          }
        },
        error: (error) => {
          this.toaster.error('Failed to add player to favorites');
        },
      });
    }
  }

  getMarketConfig(): void {
    this.communityService.getMarketConfig(this.currentTeam.communityId).subscribe({
      next: (data) => {
        this.playerDataFile = data.playerDatabase;
        this.loadPlayerData();

      },
      error: (error) => {
        this.toaster.error('Failed to load market config');
      },
    });
  }

  loadPlayerData() {
    this.playerService.getPlayers(this.playerDataFile).subscribe({
      next: (data) => {
        this.players = data;
        this.filteredPlayers = this.players;
        this.updatePaginatedPlayers();
      },
      error: (error) => {
        this.toaster.error('Failed to load player data');
      },
    });
  }

  updatePaginatedPlayers() {
    this.totalPages = Math.ceil(this.filteredPlayers.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPlayers = this.filteredPlayers.slice(startIndex, endIndex);
  }

  filterPlayersByName() {
    const query = this.searchQuery.toLowerCase();
    this.filteredPlayers = this.players.filter(player =>
      player.name.toLowerCase().includes(query)
    );
    this.currentPage = 1; // Reset to the first page after filtering
    this.updatePaginatedPlayers();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedPlayers();
      this.scrollToTop();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPlayers();
      this.scrollToTop();
    }
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
            this.getRegisteredPlayers();
          }
        })
      )
      .subscribe({
        next: () => {
          responseOK = true;
          const formattedPrice = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0
          }).format(bidAmount);

          this.toaster.success(
            `Has comprado a ${player.name} por ${formattedPrice}`
          );
        },
        error: (error) => {
          this.toaster.error('Failed to bid on player');
        },
        complete: () => {
          const currentBudget = this.sharedService.getBudget();
          const newBudget = currentBudget - bidAmount;
          this.sharedService.updateBudget(newBudget);
        }
      });
  }

  getBidDetails(player: any, bidAmount: number) {
    this.bidDetails = {
      communityId: this.currentTeam.communityId,
      type: 'transferPurchase',
      buyerId: this.currentTeam.teamId,
      buyerName: this.currentTeam.clubName,
      buyerCrest: this.currentTeam.clubCrest,
      sellerId: this.freeAgent.freeAgentId, 
      sellerName: this.freeAgent.freeAgentName,
      sellerCrest: this.freeAgent.freeAgentCrest,
      playerId: player.playerId,
      playerName: player.name,
      playerImage: player.image,
      transferAmount: bidAmount,
    };
  }

  getValueClass(value: string): string {
    if (Number(value) >= 80) {
      return 'value-rank1';
    } else if (Number(value) >= 70) {
      return 'value-rank2';
    } else if (Number(value) >= 60) {
      return 'value-rank3';
    } else if (Number(value) >= 50) {
      return 'value-rank4';
    } else {
      return 'value-rank5';
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

  showMarketPlayers() {
    this.displayFavorites = false;
    this.filterPlayersByFavorites();
  }

  showFavorites() {
    this.displayFavorites = true;
    this.filterPlayersByFavorites();
  }

  filterPlayersByFavorites() {
    if (this.displayFavorites) {
      this.filteredPlayers = this.players.filter(player =>
        this.favoritePlayers.includes(player.playerId)
      );
    } else {
      this.filteredPlayers = [...this.players]; // Reset to all players
    }
    this.currentPage = 1; // Reset to the first page after filtering
    this.updatePaginatedPlayers();
  }
}
