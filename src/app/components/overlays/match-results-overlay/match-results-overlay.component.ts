import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatchStatsDTO } from '../../../models/matchstats.dto';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-match-results-overlay',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './match-results-overlay.component.html',
  styleUrl: './match-results-overlay.component.scss'
})
export class MatchResultsOverlayComponent {
  matchResultForm: FormGroup;
  match: any;
  tournamentId: string;
  matchStats: MatchStatsDTO = new MatchStatsDTO();


  constructor(
    private fb: FormBuilder,
    private matchService: MatchService,
    private dialogRef: MatDialogRef<MatchResultsOverlayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { match: any, tournamentId: string }
  ) {

    this.matchResultForm = this.fb.group({
      home: this.fb.group({
        goals: [data.match.matchStats?.home?.goals ?? null, Validators.required],
        possession: [data.match.matchStats?.home?.possession ?? null],
        ballRecovery: [data.match.matchStats?.home?.ballRecovery ?? null],
        shots: [data.match.matchStats?.home?.shots ?? null],
        expectedGoals: [data.match.matchStats?.home?.expectedGoals ?? null],
        passes: [data.match.matchStats?.home?.passes ?? null],
        tackles: [data.match.matchStats?.home?.tackles ?? null],
        tacklesWon: [data.match.matchStats?.home?.tacklesWon ?? null],
        interceptions: [data.match.matchStats?.home?.interceptions ?? null],
        saves: [data.match.matchStats?.home?.saves ?? null],
        foulsCommitted: [data.match.matchStats?.home?.foulsCommitted ?? null],
        offsides: [data.match.matchStats?.home?.offsides ?? null],
        corners: [data.match.matchStats?.home?.corners ?? null],
        freeKicks: [data.match.matchStats?.home?.freeKicks ?? null],
        penaltyKicks: [data.match.matchStats?.home?.penaltyKicks ?? null],
        yellowCards: [data.match.matchStats?.home?.yellowCards ?? null],
        redCards: [data.match.matchStats?.home?.redCards ?? null],
        injuries: [data.match.matchStats?.home?.injuries ?? null],
      }),
      away: this.fb.group({
        goals: [data.match.matchStats?.away?.goals ?? null, Validators.required],
        possession: [data.match.matchStats?.away?.possession ?? null],
        ballRecovery: [data.match.matchStats?.away?.ballRecovery ?? null],
        shots: [data.match.matchStats?.away?.shots ?? null],
        expectedGoals: [data.match.matchStats?.away?.expectedGoals ?? null],
        passes: [data.match.matchStats?.away?.passes ?? null],
        tackles: [data.match.matchStats?.away?.tackles ?? null],
        tacklesWon: [data.match.matchStats?.away?.tacklesWon ?? null],
        interceptions: [data.match.matchStats?.away?.interceptions ?? null],
        saves: [data.match.matchStats?.away?.saves ?? null],
        foulsCommitted: [data.match.matchStats?.away?.foulsCommitted ?? null],
        offsides: [data.match.matchStats?.away?.offsides ?? null],
        corners: [data.match.matchStats?.away?.corners ?? null],
        freeKicks: [data.match.matchStats?.away?.freeKicks ?? null],
        penaltyKicks: [data.match.matchStats?.away?.penaltyKicks ?? null],
        yellowCards: [data.match.matchStats?.away?.yellowCards ?? null],
        redCards: [data.match.matchStats?.away?.redCards ?? null],
        injuries: [data.match.matchStats?.away?.injuries ?? null],
      })
    });
    
    this.match = data.match;
    this.tournamentId = data.tournamentId;
  }

  onSubmit() {
    if (this.matchResultForm.valid) {

      Object.assign(this.matchStats.home, this.matchResultForm.value.home);
      Object.assign(this.matchStats.away, this.matchResultForm.value.away);

      

      const matchData = {
        id: this.match.id,
        tournamentId: this.tournamentId,
        home: this.match.home.id,
        away: this.match.away.id,
        matchStats: this.matchStats
      }

      this.matchService.addMatchResults(matchData).subscribe ({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error adding match results:', error);
        }
      })
    }
  }

  closeOverlay() {
    this.dialogRef.close();
  }

}
