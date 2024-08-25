import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TeamDTO } from '../models/team.dto';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private currentTeamSubject = new BehaviorSubject<TeamDTO | null>(null);
  currentTeam$ = this.currentTeamSubject.asObservable();

  private budgetSource = new BehaviorSubject<number>(0);
  currentBudget$ = this.budgetSource.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const savedTeam = this.localStorageService.getItem('currentTeam');
    if (savedTeam) {
      this.currentTeamSubject.next(savedTeam);
    }
  }

  // Team methods
  setCurrentTeam(currentTeam: any) {
    this.localStorageService.setItem('currentTeam', currentTeam);
    this.currentTeamSubject.next(currentTeam); // Notify subscribers about the change
  }

  getCurrentTeam(): TeamDTO | null {
    return this.currentTeamSubject.getValue();
  }

  updateBudget(newBudget: number) {
    this.budgetSource.next(newBudget);
  }

  getBudget(): number {
    return this.budgetSource.value;
  }
}
