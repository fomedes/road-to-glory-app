import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChooseClubComponent } from './components/clubs/choose-club/choose-club.component';
import { ClubPageComponent } from './components/clubs/club-page/club-page.component';
import { CommunityPageComponent } from './components/communities/community-page/community-page.component';
import { CreateCommunityComponent } from './components/communities/create-community/create-community.component';
import { JoinCommunityComponent } from './components/communities/join-community/join-community.component';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MenuAdminToolsComponent } from './components/menus/admin/menu-admin-tools/menu-admin-tools.component';
import { MenuBudgetsComponent } from './components/menus/admin/menu-budgets/menu-budgets.component';
import { MenuGeneralComponent } from './components/menus/admin/menu-general/menu-general.component';
import { MenuMarketComponent } from './components/menus/admin/menu-market/menu-market.component';
import { MenuTeamsComponent } from './components/menus/admin/menu-teams/menu-teams.component';
import { CommunitySettingsComponent } from './components/menus/community-settings/community-settings.component';
import { MarketPlayersComponent } from './components/players/market-players/market-players.component';
import { TournamentMainComponent } from './components/tournaments/tournament-main/tournament-main.component';
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
  },
  {
    path: 'community/settings/:communityId/general',
    component: MenuGeneralComponent
  },
  {
    path: 'community/settings/:communityId/teams',
    component: MenuTeamsComponent
  },
  {
    path: 'community/settings/:communityId/market',
    component: MenuMarketComponent
  },
  {
    path: 'community/settings/:communityId/budgets',
    component: MenuBudgetsComponent
  },
  {
    path: 'community/settings/:communityId/admintools',
    component: MenuAdminToolsComponent
  },
  {
    path: 'tournament/:tournamentId',
    component: TournamentMainComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppModule {}
