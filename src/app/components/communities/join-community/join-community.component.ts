import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { CommunityDTO } from '../../../models/community.dto';
import { ToCurrencyPipe } from '../../../pipes/to-currency.pipe';
import { CommunityService } from '../../../services/community.service';
import { PasswordOverlayComponent } from '../../overlays/password-overlay/password-overlay.component';

@Component({
  selector: 'app-join-community',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,  
    MatToolbarModule,
    MatIconModule,
    ToCurrencyPipe, MatDialogModule, MatSnackBarModule
  ],
  templateUrl: './join-community.component.html',
  styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'isPrivate',
    'communityPlatforms',
    'minOvr',
    'maxOvr',
    'action',
  ];

  communities: any[] = [];

  constructor(
    private communityService: CommunityService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.communityService.getAllCommunities().subscribe((data) => {
      this.communities = data;
    });
  }

  joinCommunity(community: CommunityDTO): void {
    if (community.isPrivate) {
      this.showPasswordOverlay(community);
    } else {
      this.router.navigate(['/choose-club'], { state: { community } });
    }
  }

  showPasswordOverlay(community: CommunityDTO): void {
    const dialogRef = this.dialog.open(PasswordOverlayComponent, {
      width: '334px',
      data: { communityName: community.name }
    });
  
    dialogRef.afterClosed().subscribe((password: string | undefined) => {
      if (password) {
        this.validatePassword(community, password);
      }
    });
  }
  
  validatePassword(community: CommunityDTO, password: string): void {
    this.communityService.getCommunityAccess(community.id, password).subscribe({
      next: (response) => {
        if (response.message === 'Password is correct') {
          this.router.navigate(['/choose-club'], { state: { community } });
        } 
        else {
          this.snackBar.open('Contraseña incorrecta. Inténtalo de nuevo.', 'Cerrar', {
            duration: 3000,
          });
        }
      },
      error: (error) => {
        this.snackBar.open('Ha ocurrido un error. Inténtalo de nuevo.', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}
