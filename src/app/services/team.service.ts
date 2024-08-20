import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TeamDTO } from '../models/team.dto';
import { TeamCreationParametersDTO } from '../models/teamCreationParameters.dto';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'teams';
    this.urlApi = environment.apiUrl + this.controller;
  }

  createTeam(team: TeamCreationParametersDTO): Observable<TeamDTO> {
    return this.http.post<TeamDTO>(this.urlApi + '/create', team);
  }

  getTeamById(team_id: string): Observable<TeamDTO> {
    return this.http.get<TeamDTO>(this.urlApi + '/team/' + team_id);
  }

  getTeamsByUser(user_id: string): Observable<TeamDTO[]> {
    return this.http.get<TeamDTO[]>(this.urlApi + '/user/' + user_id);
  }

  getTeamPlayers(teamId: string): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi + '/players/' + teamId);
  }
}
