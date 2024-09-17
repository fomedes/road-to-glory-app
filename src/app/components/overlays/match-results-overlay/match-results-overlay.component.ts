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
  matchStats: MatchStatsDTO = new MatchStatsDTO();


  constructor(
    private fb: FormBuilder,
    private matchService: MatchService,
    private dialogRef: MatDialogRef<MatchResultsOverlayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.matchResultForm = this.fb.group({
      home: this.fb.group({
        goals: [data.matchStats?.home?.goals ?? null, Validators.required],
        possession: [data.matchStats?.home?.possession ?? null],
        ballRecovery: [data.matchStats?.home?.ballRecovery ?? null],
        shots: [data.matchStats?.home?.shots ?? null],
        expectedGoals: [data.matchStats?.home?.expectedGoals ?? null],
        passes: [data.matchStats?.home?.passes ?? null],
        tackles: [data.matchStats?.home?.tackles ?? null],
        tacklesWon: [data.matchStats?.home?.tacklesWon ?? null],
        interceptions: [data.matchStats?.home?.interceptions ?? null],
        saves: [data.matchStats?.home?.saves ?? null],
        foulsCommitted: [data.matchStats?.home?.foulsCommitted ?? null],
        offsides: [data.matchStats?.home?.offsides ?? null],
        corners: [data.matchStats?.home?.corners ?? null],
        freeKicks: [data.matchStats?.home?.freeKicks ?? null],
        penaltyKicks: [data.matchStats?.home?.penaltyKicks ?? null],
        yellowCards: [data.matchStats?.home?.yellowCards ?? null],
        redCards: [data.matchStats?.home?.redCards ?? null],
        injuries: [data.matchStats?.home?.injuries ?? null],
      }),
      away: this.fb.group({
        goals: [data.matchStats?.away?.goals ?? null, Validators.required],
        possession: [data.matchStats?.away?.possession ?? null],
        ballRecovery: [data.matchStats?.away?.ballRecovery ?? null],
        shots: [data.matchStats?.away?.shots ?? null],
        expectedGoals: [data.matchStats?.away?.expectedGoals ?? null],
        passes: [data.matchStats?.away?.passes ?? null],
        tackles: [data.matchStats?.away?.tackles ?? null],
        tacklesWon: [data.matchStats?.away?.tacklesWon ?? null],
        interceptions: [data.matchStats?.away?.interceptions ?? null],
        saves: [data.matchStats?.away?.saves ?? null],
        foulsCommitted: [data.matchStats?.away?.foulsCommitted ?? null],
        offsides: [data.matchStats?.away?.offsides ?? null],
        corners: [data.matchStats?.away?.corners ?? null],
        freeKicks: [data.matchStats?.away?.freeKicks ?? null],
        penaltyKicks: [data.matchStats?.away?.penaltyKicks ?? null],
        yellowCards: [data.matchStats?.away?.yellowCards ?? null],
        redCards: [data.matchStats?.away?.redCards ?? null],
        injuries: [data.matchStats?.away?.injuries ?? null],
      })
    });
    
    this.match = data;
    console.log('Match:', this.match);
  }

  onSubmit() {
    if (this.matchResultForm.valid) {

      Object.assign(this.matchStats.home, this.matchResultForm.value.home);
      Object.assign(this.matchStats.away, this.matchResultForm.value.away);

      

      const matchData = {
        id: this.match.id,
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
