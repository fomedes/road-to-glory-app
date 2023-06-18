import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PlayerDTO } from 'src/app/Players/models/player.dto';
import { PlayerService } from 'src/app/Players/services/player.service';
import { SpanishPaginatorIntl } from 'src/app/Shared/spanish-paginator-intl';
import { SelectedPlayers } from '../../models/auctionPlayers.dto';
import { MarketSettingsDTO } from '../../models/marketSettings.dto';
import { selectedPlayerDTO } from '../../models/selectedPlayer.dto';
import { MarketService } from '../../services/market.service';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.scss'],
})
export class MarketListComponent {
  @ViewChild('bidOverlay') bidOverlay!: TemplateRef<any>;

  players!: PlayerDTO[];
  marketSettings!: MarketSettingsDTO[];
  selectedPlayers!: SelectedPlayers[];
  auctionedPlayers: any[] = [];
  playerIds!: number[];
  countdown: string = '';
  userFunds!: number;
  marketEnding: boolean = false;
  dialogRef!: MatDialogRef<any>;
  player: any;

  bidForm: FormGroup;
  bidAmount: FormControl;

  page: number = 1;
  playerPrices!: any[];
  displayedColumns: string[] = [
    'avatar',
    'positions',
    'name',
    'price',
    'overall',
    'weakFoot',
    'skills',
    'bidAmount',
  ];

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  totalItems: any;

  dataSource!: MatTableDataSource<PlayerDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private marketService: MarketService,
    private playerService: PlayerService,
    private router: Router,
    private paginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.paginatorIntl = new SpanishPaginatorIntl();
    this.loadMarket();
    setInterval(() => {
      this.getCountdown();
    }, 60000);
    setInterval(() => {
      this.getMarketSettings();
    }, 60000);

    this.bidAmount = new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      this.divisibleBidValidator(),
      this.bidAmountValidator(),
      this.fundsValidator(),
    ]);

    this.bidForm = this.formBuilder.group({
      bidAmount: this.bidAmount,
    });
  }

  private loadMarket(): void {
    let errorResponse: any;

    //load prices
    this.playerService.getPlayerPrices().subscribe((playerPrices) => {
      this.playerPrices = playerPrices[0]; //comunity at position 0
    });

    //get players API
    this.getPlayersApi();

    this.getMarketSettings();

    this.getCountdown();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getPlayersApi(): void {
    let errorResponse: any;

    this.playerService.getPlayers().subscribe(
      (playersList) => {
        this.players = playersList;
      },
      (error: any) => {
        errorResponse = error.error;
      }
    );
  }

  private getMarketSettings() {
    let errorResponse: any;

    this.getFunds();

    this.marketService.getAuctionPlayers().subscribe((auctionPlayers) => {
      this.marketSettings = auctionPlayers[0];
      this.selectedPlayers = auctionPlayers[0].selected_players;

      const parsedSelectedPlayers = Array.isArray(this.selectedPlayers)
        ? this.selectedPlayers
        : JSON.parse(this.selectedPlayers);

      this.playerIds = parsedSelectedPlayers.map(
        (player: selectedPlayerDTO) => player.player_id
      );

      this.auctionedPlayers = this.players.filter((obj) => {
        return this.playerIds.includes(obj.id);
      });

      this.totalItems = this.auctionedPlayers.length;
      this.page = 0;
      this.dataSource = new MatTableDataSource<PlayerDTO>(
        this.auctionedPlayers
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  private getCountdown(): void {
    this.marketService.getMarketSettings().subscribe((marketSettings) => {
      this.marketSettings = marketSettings[0];

      const marketEndDate = new Date(marketSettings[0].end_date);
      const currentDate = new Date();
      const timeDifference = marketEndDate.getTime() - currentDate.getTime();
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      if (minutes < 1) {
        this.marketEnding = true;
      } else {
        this.marketEnding = false;
      }

      this.countdown = `${days}d ${hours}h ${minutes}m`;
    });
  }

  private getFunds(): void {
    this.marketService.getUserFunds().subscribe((resp) => {
      this.userFunds = resp.funds;
    });
  }

  // Overlay methods

  public bidPlayerOverlay(player: any): void {
    this.player = player;
    this.player.shortName = player.short_name;
    this.player.price = this.playerPrices[player.overall];
    this.dialogRef = this.dialog.open(this.bidOverlay, {
      width: '300px',
      height: '450px',
      disableClose: true,
    });
  }

  public sendBid(player: PlayerDTO) {
    const user_id = localStorage.getItem('user_id');
    const bidAmount = this.bidForm.value.bidAmount;

    const bidData: selectedPlayerDTO = {
      player_id: player.id,
      bidding_club: user_id,
      bidding_amount: bidAmount,
      bidding_date: new Date(),
    };

    this.marketService.bidPlayer(bidData).subscribe(
      (response) => {
        console.log('Bid placed succesfully:', response);
        // Close Overlay and reset form
        this.dialogRef.close();
        this.bidForm.reset();
      },
      (error) => {
        console.error('Bid placement error:', error);
      }
    );
  }

  public closeOverlay(dialogRef: MatDialogRef<any>) {
    dialogRef.close();
    this.bidForm.reset();
  }

  // Custom Validators and Error Messages

  divisibleBidValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (isNaN(value) || value % 100000 !== 0) {
        return { divisibleBid: true };
      }
      return null;
    };
  }

  private bidAmountValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!this.player) {
        return null;
      }
      const bidAmount = control.value;
      const playerPrice = this.player.price;
      if (bidAmount < playerPrice) {
        return { invalidBid: true };
      }

      return null;
    };
  }

  private fundsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const bidAmount = control.value;
      const isValid = bidAmount <= this.userFunds;
      return isValid ? null : { exceedsFunds: true };
    };
  }

  getValidationMessage(controlName: string): string {
    const control = this.bidForm.get(controlName);
    if (control?.invalid && control?.touched) {
      for (const errorKey in control.errors) {
        if (control.errors.hasOwnProperty(errorKey)) {
          switch (errorKey) {
            case 'required':
              return 'El campo es obligatorio';
            case 'pattern':
              return 'Introduce una puja numérica';
            case 'divisibleBid':
              return `La puja debe ser divisible por 100000`;
            case 'invalidBid':
              return `La puja debe ser igual o mayor al valor del jugador`;
            case 'exceedsFunds':
              return `No tienes suficiente presupuesto`;

            default:
              return '';
          }
        }
      }
    }
    return '';
  }
}
