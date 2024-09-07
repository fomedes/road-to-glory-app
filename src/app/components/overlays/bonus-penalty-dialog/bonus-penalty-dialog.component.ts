import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-bonus-penalty-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    MatSelectModule, 
    MatInputModule, 
    NgxCurrencyDirective],
  templateUrl: './bonus-penalty-dialog.component.html',
  styleUrl: './bonus-penalty-dialog.component.scss'
})
export class BonusPenaltyDialogComponent {
  bonusPenaltyForm: FormGroup;
  teams: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<BonusPenaltyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { teams: any[] },
    private fb: FormBuilder
  ) {
    this.teams = data.teams;
    this.bonusPenaltyForm = this.fb.group({
      message: ['', [Validators.maxLength(255)]],
      actionType: ['', Validators.required],
      teamId: ['', Validators.required],
      amount: ['', [Validators.required]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.bonusPenaltyForm.valid) {
      this.dialogRef.close(this.bonusPenaltyForm.value);
    }
    console.log(this.bonusPenaltyForm.value);
  }
}
