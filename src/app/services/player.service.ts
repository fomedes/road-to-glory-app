import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerDTO } from '../models/player.dto';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  // private urlApi: string;
  // private controller: string;

  constructor(private http: HttpClient) {
    // this.controller = 'players';
  }

  getPlayerPrices(filePath: string): Observable<any[]> {
    return this.http.get<any[]>(filePath);
  }

  getPlayers(filePath: string): Observable<PlayerDTO[]> {
    return this.http.get<PlayerDTO[]>(filePath);
  }

  sellPlayer(teamId: string, playerId: string): Observable<any> {
    return this.http.put<any>(
      `/api/teams/${teamId}/players/${playerId}/sell`,
      null
    );
  }
}
