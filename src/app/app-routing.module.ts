import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login/login.component';
import { HomeComponent } from './Home/components/home/home.component';
import { ResultsComponent } from './Home/components/results/results.component';
import { MarketListComponent } from './Market/components/market-list/market-list.component';
import { ClubComponent } from './Players/components/club/club.component';
import { PlayerItemComponent } from './Players/components/player-item/player-item.component';
import { PlayerListComponent } from './Players/components/player-list/player-list.component';
import { RegisterComponent } from './User/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'players',
    component: PlayerListComponent,
  },
  {
    path: 'players/:id',
    component: PlayerItemComponent,
  },
  {
    path: 'market',
    component: MarketListComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'results',
    component: ResultsComponent,
  },
  {
    path: 'club',
    component: ClubComponent,
  },
  {
    path: `user/:id`,
    component: MarketListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
