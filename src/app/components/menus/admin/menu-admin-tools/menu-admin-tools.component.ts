import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AdminToolsService } from '../../../../services/admin-tools.service';
import { CommunityService } from '../../../../services/community.service';
import { BonusPenaltyDialogComponent } from '../../../overlays/bonus-penalty-dialog/bonus-penalty-dialog.component';
import { ConfirmationDialogComponent } from '../../../overlays/confirmation-dialog/confirmation-dialog.component';
import { TournamentCreationComponent } from '../../../overlays/tournament-creation/tournament-creation.component';
import { ReturnButtonComponent } from '../../../shared/return-button/return-button.component';

@Component({
  selector: 'app-menu-admin-tools',
  standalone: true,
  imports: [ReturnButtonComponent, RouterModule, MatSnackBarModule, MatDialogModule],
  templateUrl: './menu-admin-tools.component.html',
  styleUrl: './menu-admin-tools.component.scss'
})
export class MenuAdminToolsComponent {
  communityId: string = '';
  communityData: any = {};

  constructor ( 
    private router: Router, 
    private communityService: CommunityService,
    private adminToolsService: AdminToolsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.communityData = navigation.extras.state['communityData'];
    }
  }

  advanceSeason() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `¿Estás seguro de que deseas avanzar a la temporada ${this.communityData.currentSeason.seasonNumber + 1}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed
        this.communityService.advanceSeason(this.communityData.id).subscribe({
          next: (response: any) => {
            if (response.message === 'Success') {
              this.communityData = response.community;
              this.snackBar.open('Nueva temporada iniciada!.', 'Cerrar', {
                duration: 3000,
              });
            }
          },
          error: (error) => {
            this.snackBar.open('Ocurrió un error al avanzar la temporada.', 'Cerrar', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  teamBonusPenalty() {
    const dialogRef = this.dialog.open(BonusPenaltyDialogComponent, {
      data: { teams: this.communityData.teams }
    });

    dialogRef.afterClosed().subscribe(adjustmentData => {
      if (adjustmentData) {
        this.adminToolsService.applyTeamBudgetAdjustment(
          adjustmentData
        ).subscribe({
          next: (response: any) => {
            console.log(response.message);
            this.snackBar.open(`${adjustmentData.actionType} asignada con éxito!`, 'Cerrar', {
              duration: 3000,
            });
          },
          error: (error: any) => {
            console.error(error);
            this.snackBar.open(`Ocurrió un error al asignar la ${adjustmentData.actionType}.`, 'Cerrar', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  createTournament (){
    const dialogRef = this.dialog.open(TournamentCreationComponent, {
      data: { communityData: this.communityData }
    });

    dialogRef.afterClosed().subscribe(newTournament => {
      console.log(newTournament);
      if (newTournament) {
        this.snackBar.open(`Torneo creado con éxito!`, 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}