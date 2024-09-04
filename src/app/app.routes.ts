import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChooseClubComponent } from './components/clubs/choose-club/choose-club.component';
import { ClubPageComponent } from './components/clubs/club-page/club-page.component';
import { CommunityPageComponent } from './components/communities/community-page/community-page.component';
import { CreateCommunityComponent } from './components/communities/create-community/create-community.component';
import { JoinCommunityComponent } from './components/communities/join-community/join-community.component';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CommunitySettingsComponent } from './components/menus/community-settings/community-settings.component';
import { MarketPlayersComponent } from './components/players/market-players/market-players.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create-community',
    component: CreateCommunityComponent,
  },
  {
    path: 'join-community',
    component: JoinCommunityComponent,
  },
  {
    path: 'choose-club',
    component: ChooseClubComponent,
  },
  {
    path: 'market',
    component: MarketPlayersComponent,
  },
  {
    path: 'community/:communityId',
    component: CommunityPageComponent,
  },
  {
    path: 'club',
    component: ClubPageComponent,
  },  
  {
    path: 'club/:teamId',
    component: ClubPageComponent,
  },
  {
    path: 'community/settings/:communityId',
    component: CommunitySettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppModule {}
