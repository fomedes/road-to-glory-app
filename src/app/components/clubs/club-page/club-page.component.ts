import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CommunityService } from '../../../services/community.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { MarketService } from '../../../services/market.service';
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
  playerPricesFile = 'assets/data/prices/player-prices.json';
  freeAgent: any = {
    freeAgentId: '66c76ea075bb6f00380323af',
    freeAgentName: 'Free Agent',
    freeAgentCrest: 'assets/images/others/free_agent_crest.png',
  }



  teamPlayerIds: any[] = [];
  teamPlayers: any[] = [];
  teamId: string = '';
  currentTeam: any = {};
  
  communityMultiplier: number = 1;
  saleDetails: any = {};
  playerPrices: any[] = [];
  releasePrice: number = 0


  constructor(
    private teamService: TeamService,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private playerService: PlayerService,
    private toaster: ToastrService,
    private communityService: CommunityService,
    private marketService: MarketService,
  ) {}

  ngOnInit(): void {
    this.currentTeam = this.localStorageService.getItem('currentTeam');
    this.getMarketConfig();
    this.getPlayerPrices();
  }

  getMarketConfig(): void {
    this.communityService.getMarketConfig(this.currentTeam.communityId).subscribe({
      next: (data) => {
        this.playerDataFile = data.playerDatabase;
        this.getTeamPlayers();
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
        this.teamPlayerIds.includes(player.playerId)
      );
    });
  }

  getSaleDetails(player: any, saleAmount: number) {
    this.saleDetails = {
      communityId: this.currentTeam.communityId,
      type: 'transferSale',
      buyerId: this.freeAgent.freeAgentId, 
      buyerName: this.freeAgent.freeAgentName,
      buyerCrest: this.freeAgent.freeAgentCrest,
      sellerId: this.currentTeam.teamId,
      sellerName: this.currentTeam.clubName,
      sellerCrest: this.currentTeam.clubCrest,
      playerId: player.playerId,
      playerName: player.name,
      playerImage: player.image,
      transferAmount: saleAmount,
    };
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

  public getPlayerReleasePrice(ovr: string): number {
    const priceObj = this.playerPrices.find(
      (price) => price.ovr === Number(ovr)
    );
    this.releasePrice = priceObj.price * this.communityMultiplier
    return this.releasePrice ? this.releasePrice : 0;
  }


  releasePlayer(player: any) {
    this.getSaleDetails(player, this.getPlayerReleasePrice(player.overallRating))
    let responseOK: boolean = false;

    this.marketService
      .releasePlayer(this.saleDetails)
      .pipe(
        finalize(async () => {
          if (responseOK) {
            this.getTeamPlayers();
          }
        })
      )
      .subscribe({
        next: (response) => {
          responseOK = true;
          const formattedPrice = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0
          }).format(this.releasePrice);
          
          this.toaster.success(
            `${player.name} ha sido liberado a cambio de ${formattedPrice}`
          );
        },
        error: (error) => {
          responseOK = false;
          console.error(error);
          this.toaster.error(
            'Ocurrió un error al vender al jugador. Inténtalo de nuevo.'
          );
        },
      });
  }
}
