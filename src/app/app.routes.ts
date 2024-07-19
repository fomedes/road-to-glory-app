import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateCommunityComponent } from './components/communities/create-community/create-community.component';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppModule {}
