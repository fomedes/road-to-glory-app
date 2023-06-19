import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlayerDTO } from '../models/player.dto';
import { soldPlayerDTO } from '../models/soldPlayer.dto';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl = environment.apiBaseUrl;
  private userId = localStorage.getItem('user_id');

  private urlPlayerApi: string;
  private urlPlayerPricesApi: string;
  private urlUserApi: string;
  private urlSellApi: string;

  private playerController: string;
  private pricesController: string;
  private userController: string;
  private sellController: string;

  constructor(private http: HttpClient) {
    this.playerController = 'players';
    this.pricesController = 'prices';
    this.userController = 'users';
    this.sellController = 'market/sale';

    this.urlPlayerApi = this.apiUrl + this.playerController;
    this.urlPlayerPricesApi = this.apiUrl + this.pricesController;
    this.urlUserApi = this.apiUrl + this.userController + '/' + this.userId;
    this.urlSellApi = this.apiUrl + this.sellController;
  }

  getPlayers(): Observable<PlayerDTO[]> {
    return this.http.get<PlayerDTO[]>(this.urlPlayerApi);
  }

  getPlayerById(playerId: number): Observable<PlayerDTO[]> {
    return this.http.get<PlayerDTO[]>(this.urlPlayerApi + '/' + playerId);
  }

  getPlayerPrices(): Observable<any[]> {
    return this.http.get<any[]>(this.urlPlayerPricesApi);
  }

  getClubPlayersByUser(): Observable<any> {
    return this.http.get<any[]>(this.urlUserApi);
  }

  sellPlayer(bidData: soldPlayerDTO): Observable<any> {
    return this.http.post<soldPlayerDTO>(`${this.urlSellApi}`, bidData);
  }
}
