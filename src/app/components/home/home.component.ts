import { Component, OnInit } from '@angular/core';
// import { CommunityComponent } from './community.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, MatButton],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
