import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';
import { CommunityDTO } from '../../../models/community.dto';
import { TeamCreationParametersDTO } from '../../../models/teamCreationParameters.dto';
import { LocalStorageService } from '../../../services/local-storage.service';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-choose-club',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './choose-club.component.html',
  styleUrls: ['./choose-club.component.scss'],
})
export class ChooseClubComponent implements OnInit {
  toaster = inject(ToastrService);

  clubDataFile = 'assets/data/clubs/clubs_240702.json';
  clubData: any;
  availableCountries: any = [];
  availableLeagues: any = [];
  availableClubs: any = [];
  clubCrest: string = '';
  clubKitHome: string = '';
  clubKitAway: string = '';
  clubKitThird: string = '';
  clubKitKeeper: string = '';
  currentCountryIndex: number = 0;
  currentLeagueIndex: number = 0;
  currentClubIndex: number = 0;

  communityParameters: CommunityDTO = new CommunityDTO();
  teamCreationParameters: TeamCreationParametersDTO =
    new TeamCreationParametersDTO();

  chosenClub: any;
  country: FormControl;
  league: FormControl;
  club: FormControl;
  clubForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private teamService: TeamService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.communityParameters = navigation.extras.state['community'];
    }

    this.country = new FormControl('');
    this.league = new FormControl('');
    this.club = new FormControl('', [Validators.required]);

    this.clubForm = this.formBuilder.group({
      country: this.country,
      league: this.league,
      club: this.club,
    });
  }

  ngOnInit(): void {
    this.extractClubData();
  }

  private getClubData(): Observable<any> {
    return this.http.get<any[]>(this.clubDataFile);
  }

  private extractClubData() {
    this.getClubData().subscribe((data) => {
      this.clubData = data;

      // Get countries, leagues and clubs
      this.availableCountries = this.clubData.countries;
      this.availableLeagues = this.clubData.countries[0].leagues;
      this.availableClubs = this.clubData.clubs.filter(
        (club: any) =>
          club.league_id === this.availableCountries[0].leagues[0].league_id
      );

      // Set initial values
      this.country.setValue(this.availableCountries[0].country_id);
      this.league.setValue(this.availableCountries[0].leagues[0].league_id);
      this.club.setValue(this.availableClubs[0].club_id);
      this.getClubImages(this.availableClubs[0].club_id);
    });
  }

  onCountryChange(event: any) {
    const selectedCountryId = event.value;
    const selectedCountry = this.clubData.countries.find(
      (country: any) => country.country_id === selectedCountryId
    );

    if (selectedCountry) {
      this.availableLeagues = selectedCountry.leagues;
      this.league.setValue(this.availableLeagues[0].league_id);
      this.onLeagueChange({ value: this.availableLeagues[0].league_id });
    }
  }

  onLeagueChange(event: any) {
    const selectedLeagueId = event.value;
    const selectedLeague = this.clubData.leagues.find(
      (league: any) => league.league_id === selectedLeagueId
    );

    if (selectedLeague) {
      this.availableClubs = this.clubData.clubs.filter(
        (club: any) => club.league_id === selectedLeagueId
      );
      this.country.setValue(selectedLeague.country_id);
      this.club.setValue(this.availableClubs[0].club_id);
      this.getClubImages(this.availableClubs[0].club_id);
    }
  }

  onClubChange(event: any) {
    const selectedClubId = event.value;
    const selectedClub = this.clubData.clubs.find(
      (club: any) => club.club_id === selectedClubId
    );

    if (selectedClub) {
      this.country.setValue(selectedClub.country_id);
      this.league.setValue(selectedClub.league_id);
      this.getClubImages(selectedClubId);
    }
  }

  createTeam(): void {
    this.setNewTeamData();

    let responseOK: boolean = false;

    this.teamService
      .createTeam(this.teamCreationParameters)
      .pipe(
        finalize(async () => {
          if (responseOK) {
            this.clubForm.reset();
            this.router.navigateByUrl('home');
          }
        })
      )
      .subscribe({
        next: (response) => {
          responseOK = true;
          this.toaster.success('Has fichado por tu nuevo club!');
        },
        error: (error: HttpErrorResponse) => {
          responseOK = false;
          console.error(error);
          this.toaster.error(
            'Ocurrió un error al elegir tu club. Inténtalo de nuevo.'
          );
        },
      });
  }

  private setNewTeamData() {
    const user = this.localStorageService.getItem('user');
    user
      ? (this.teamCreationParameters.user_id = user.user_id)
      : console.error('Failed to get user ID from AuthService');
    console.log(this.teamCreationParameters);

    this.club ? (this.teamCreationParameters.club_id = this.club.value) : null;
    this.teamCreationParameters.club_name =
      this.availableClubs[this.currentClubIndex]?.club_name;
    this.teamCreationParameters.club_crest =
      this.availableClubs[this.currentClubIndex]?.crest;

    if (this.communityParameters) {
      this.teamCreationParameters.community_id = this.communityParameters.id;
      this.teamCreationParameters.budget = Number(
        this.communityParameters.startingBudget
      );
      this.teamCreationParameters.maxOvr =
        this.communityParameters.market.maxOvr;
      this.teamCreationParameters.minOvr =
        this.communityParameters.market.minOvr;
      this.teamCreationParameters.random_players =
        this.communityParameters.market.randomPlayers;
    }
  }

  getClubImages(club_id: string) {
    const selectedClub = this.clubData.clubs.find(
      (club: any) => club.club_id === club_id
    );

    if (selectedClub) {
      this.clubCrest = selectedClub.crest;
      this.clubKitHome = selectedClub.kits.firstKit;
      this.clubKitAway = selectedClub.kits.secondKit;
      this.clubKitKeeper = selectedClub.kits.keeperKit;
      if (selectedClub.kits.thirdKit) {
        selectedClub.kits.thirdKit = selectedClub.kits.thirdKit;
      }
    }
  }

  // To be extracted in smaller methods
  previousOption(option: string) {
    if (option === 'club') {
      if (this.currentClubIndex > 0) {
        this.currentClubIndex--;
        const club = this.availableClubs[this.currentClubIndex];
        this.club.setValue(club.club_id);
        this.getClubImages(club.club_id);
      } else if (this.currentClubIndex === 0) {
        this.currentClubIndex = this.availableClubs.length - 1;
        const club = this.availableClubs[this.currentClubIndex];
        this.club.setValue(club.club_id);
        this.getClubImages(club.club_id);
      }
    } else if (option === 'league') {
      if (this.currentLeagueIndex > 0) {
        this.currentLeagueIndex--;
        const league = this.availableLeagues[this.currentLeagueIndex];
        this.league.setValue(league.league_id);
        this.currentClubIndex = 0;
        this.onLeagueChange({ value: league.league_id });
      } else if (this.currentLeagueIndex === 0) {
        this.currentLeagueIndex = this.availableLeagues.length - 1;
        const league = this.availableLeagues[this.currentLeagueIndex];
        this.league.setValue(league.league_id);
        this.currentClubIndex = 0;
        this.onLeagueChange({ value: league.league_id });
      }
    } else if (option === 'country') {
      if (this.currentCountryIndex > 0) {
        this.currentCountryIndex--;
        const country = this.availableCountries[this.currentCountryIndex];
        this.country.setValue(country.country_id);
        this.currentClubIndex = 0;
        this.onCountryChange({ value: country.country_id });
      } else if (this.currentCountryIndex === 0) {
        this.currentCountryIndex = this.availableCountries.length - 1;
        const country = this.availableCountries[this.currentCountryIndex];
        this.country.setValue(country.country_id);
        this.currentClubIndex = 0;
        this.onCountryChange({ value: country.country_id });
      }
    }
  }

  // To be extracted in smaller methods
  nextOption(option: string) {
    if (option === 'club') {
      if (this.currentClubIndex < this.availableClubs.length - 1) {
        this.currentClubIndex++;
        const club = this.availableClubs[this.currentClubIndex];
        this.club.setValue(club.club_id);
        this.getClubImages(club.club_id);
      } else if (this.currentClubIndex === this.availableClubs.length - 1) {
        this.currentClubIndex = 0;
        const club = this.availableClubs[this.currentClubIndex];
        this.club.setValue(club.club_id);
        this.getClubImages(club.club_id);
      }
    } else if (option === 'league') {
      if (this.currentLeagueIndex < this.availableLeagues.length - 1) {
        this.currentLeagueIndex++;
        const league = this.availableLeagues[this.currentLeagueIndex];
        this.league.setValue(league.league_id);
        this.currentClubIndex = 0;
        this.onLeagueChange({ value: league.league_id });
      } else if (this.currentLeagueIndex === this.availableLeagues.length - 1) {
        this.currentLeagueIndex = 0;
        const league = this.availableLeagues[this.currentLeagueIndex];
        this.league.setValue(league.league_id);
        this.currentClubIndex = 0;
        this.onLeagueChange({ value: league.league_id });
      }
    } else if (option === 'country') {
      if (this.currentCountryIndex < this.availableCountries.length - 1) {
        this.currentCountryIndex++;
        const country = this.availableCountries[this.currentCountryIndex];
        this.country.setValue(country.country_id);
        this.currentClubIndex = 0;
        this.onCountryChange({ value: country.country_id });
      } else if (
        this.currentCountryIndex ===
        this.availableCountries.length - 1
      ) {
        this.currentCountryIndex = 0;
        const country = this.availableCountries[this.currentCountryIndex];
        this.country.setValue(country.country_id);
        this.currentClubIndex = 0;
        this.onCountryChange({ value: country.country_id });
      }
    }
  }
}
