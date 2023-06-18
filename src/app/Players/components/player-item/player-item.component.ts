import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.scss'],
})
export class PlayerItemComponent implements OnInit {
  player: any;
  private playerId: number;
  playerPrices!: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private router: Router
  ) {
    this.playerId = this.activatedRoute.snapshot.params['id'];
    /*
    this.player = new PlayerDTO(0,'','',0,0,0,'','',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'','',0,0,'','','',false,'',true);
    */
  }

  ngOnInit(): void {
    let errorResponse: any;

    this.playerService.getPlayerPrices().subscribe(
      (playerPrices) => {
        this.playerPrices = playerPrices[0];
      },
      (error: any) => {
        errorResponse = error.error;
      }
    );

    this.playerService.getPlayerById(this.playerId).subscribe(
      (player) => {
        this.player = player;
      },
      (error: any) => {
        errorResponse = error.error;
      }
    );
  }
}
