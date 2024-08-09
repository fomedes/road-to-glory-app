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

  constructor(private localStorageService: LocalStorageService) {
    const savedTeam = this.localStorageService.getItem('currentTeam');
    if (savedTeam) {
      this.currentTeamSubject.next(savedTeam);
    }
  }

  // Team methods
  setCurrentTeam(currentTeam: TeamDTO) {
    this.localStorageService.setItem('currentTeam', currentTeam);
    this.currentTeamSubject.next(currentTeam); // Notify subscribers about the change
  }

  getCurrentTeam(): TeamDTO | null {
    return this.currentTeamSubject.getValue();
  }
}
