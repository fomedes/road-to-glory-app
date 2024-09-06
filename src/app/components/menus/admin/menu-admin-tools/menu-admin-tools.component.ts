import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { CommunityService } from '../../../../services/community.service';
import { ReturnButtonComponent } from '../../../shared/return-button/return-button.component';

@Component({
  selector: 'app-menu-admin-tools',
  standalone: true,
  imports: [ReturnButtonComponent, RouterModule, MatSnackBarModule],
  templateUrl: './menu-admin-tools.component.html',
  styleUrl: './menu-admin-tools.component.scss'
})
export class MenuAdminToolsComponent {
  communityId: string = '';
  communityData: any = {};

  constructor ( 
    private router: Router, 
    private communityService: CommunityService,
    private snackBar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.communityData = navigation.extras.state['communityData'];
    }
  }

  advanceSeason() {
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
}
