import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIcon, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentTeam: any;
  private subscription: Subscription = new Subscription();

  constructor(
    private sharedService: SharedService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.sharedService.currentTeam$.subscribe((team) => {
        this.currentTeam = team;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  failMessage() {
    this.toaster.error(
      'Esta acción no está habilitada. Puedes recomendar opciones para este botón'
    );
  }
}
