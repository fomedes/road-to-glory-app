import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-overlay',
  standalone: true,
  imports: [MatDialogModule, FormsModule, CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './password-overlay.component.html',
  styleUrl: './password-overlay.component.scss'
})
export class PasswordOverlayComponent {
  password: string = '';

  constructor(
    public dialogRef: MatDialogRef<PasswordOverlayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { communityName: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.password);
  }

}
