import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { TournamentService } from '../../../services/tournament.service';

@Component({
  selector: 'app-tournament-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-main.component.html',
  styleUrl: './tournament-main.component.scss'
})
export class TournamentMainComponent implements OnInit{
  tournamentId: string = ''
  tournamentData: any = {}
  calendarMatches: any = {}
  currentUser: any

  constructor (
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.tournamentId = params.get('tournamentId') ?? '';
      this.getTournamentData()
      this.getUserTeamId()
    });
  }


  getTournamentData(){
    this.tournamentService.getTournament(this.tournamentId).subscribe((tournament) => {
      this.tournamentData = tournament;
      console.log(this.tournamentData)
      this.organizeMatches(tournament.matches)
    });
 }
 
  organizeMatches(matches: any){
    matches.forEach((match: any) => {
      const split = match.split;
      const matchday = match.matchday;

      if (!this.calendarMatches[split]) {
        this.calendarMatches[split] = {};
      }

      if (!this.calendarMatches[split][matchday]) {
        this.calendarMatches[split][matchday] = [];
      }

      this.calendarMatches[split][matchday].push(match);
    });

  }

  getSplits(): number[] {
    return Object.keys(this.calendarMatches).map(Number);
  }
  
  getMatchdays(split: number): number[] {
    return Object.keys(this.calendarMatches[split]).map(Number);
  }

  getUserTeamId(){
    this.currentUser = this.localStorageService.getItem('user');
  }

  matchBelongsToUserTeam(match: any): boolean {
    return match.homeTeam === this.currentUser.teamId || match.awayTeam === this.currentUser.teamId
  }

  consoleMatch(match: any): void {
    console.log(match)
  }
}

