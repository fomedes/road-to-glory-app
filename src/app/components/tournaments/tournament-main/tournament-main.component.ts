import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { TournamentService } from '../../../services/tournament.service';
import { MatchResultsOverlayComponent } from '../../overlays/match-results-overlay/match-results-overlay.component';

@Component({
  selector: 'app-tournament-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-main.component.html',
  styleUrl: './tournament-main.component.scss'
})
export class TournamentMainComponent implements OnInit{
  tournamentId: string = ''
  tournamentData: any
  calendarMatches: any = {}
  currentTeam: any

  constructor (
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.tournamentId = params.get('tournamentId') ?? '';
      this.getTournamentData()
      this.getUserTeam()
    });
  }


  getTournamentData(){
    this.tournamentService.getTournament(this.tournamentId).subscribe((tournament) => {
      this.tournamentData = tournament;
      this.organizeMatches(tournament.matches)
    });
 }
 
  organizeMatches(matches: any){
    this.calendarMatches = {}
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

  getUserTeam(){
    this.currentTeam = this.localStorageService.getItem('currentTeam');
  }


  addMatchResult(match: any) {
    const dialogRef = this.dialog.open(MatchResultsOverlayComponent, {
      data: { 
        match: match, 
        tournamentId: this.tournamentId 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const matchIndex = this.tournamentData.matches.findIndex((m: any) => m.id === match.id);
        if (matchIndex !== -1) {
          this.tournamentData.matches[matchIndex].matchStats = result.matchStats;
          this.organizeMatches(this.tournamentData.matches);
        }
      }
    });
  }
}

