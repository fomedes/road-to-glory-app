import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'tournaments';
    this.urlApi = environment.apiUrl + this.controller;
  }
  createTournament(tournamentData: any): Observable<any> {
    return this.http.post<any>(this.urlApi + '/create',  tournamentData);
  }

  getTournament(tournamentId: string): Observable<any> {
    return this.http.get<any>(this.urlApi + '/getTournament/' + tournamentId);
  }
}
