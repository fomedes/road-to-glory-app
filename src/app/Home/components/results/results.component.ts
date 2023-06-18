import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  resultsForm!: FormGroup;
  gameOptions: string[] = [
    'Team A vs Team B',
    'Team A vs Team C',
    'Team A vs Team D',
    'Team A vs Team E',
    'Team A vs Team F',
    'Team A vs Team G',
    'Team A vs Team H',
    'Team A vs Team I',
    'Team A vs Team J',
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.resultsForm = this.formBuilder.group({
      selectedOption: ['', Validators.required],
      localGoals: ['', Validators.required],
      visitorGoals: ['', Validators.required],
    });
  }

  sendResults() {
    if (this.resultsForm.valid) {
      console.log(this.resultsForm.value);
      this.router.navigateByUrl('home'); //temporary
    }
  }
}
