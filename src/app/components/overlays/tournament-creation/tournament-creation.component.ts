import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TournamentService } from '../../../services/tournament.service';

@Component({
  selector: 'app-tournament-creation',
  standalone: true,
  imports: [    
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './tournament-creation.component.html',
  styleUrl: './tournament-creation.component.scss'
})
export class TournamentCreationComponent {
  tournamentForm!: FormGroup;
  tournamentTypes = [
    { value: 'league', displaytext: 'Liga' },
    { value: 'singleElimination', displaytext: 'Eliminatoria simple' }
  ];
  communityData: any = '';


  constructor(
    public dialogRef: MatDialogRef<TournamentCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private snackBar: MatSnackBar
  ) {
    this.communityData = data.communityData
  }

  ngOnInit(): void {
    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      tournamentType: ['', Validators.required],
      teams: [[], Validators.required],
      numSplits: [1, [Validators.required, Validators.min(1)]],
      communityId: this.communityData.id
    });
  }

  onSubmit() {
    if (this.tournamentForm.valid) {
      const tournamentData = this.tournamentForm.value;

      this.tournamentService.createTournament(tournamentData).subscribe({
        next: (response) => {
          this.snackBar.open('Tournament created successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.snackBar.open('Failed to create tournament. Please try again.', 'Close', { duration: 3000 });
          console.error('Error creating tournament:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
