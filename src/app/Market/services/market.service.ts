import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { selectedPlayerDTO } from '../models/selectedPlayer.dto';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private apiUrl = environment.apiBaseUrl;
  private userId = localStorage.getItem('user_id');

  private urlPlayerApi: string;
  private urlPlayerPricesApi: string;
  private urlMarketApi: string;
  private urlAuctionApi: string;
  private urlUserApi: string;
  private urlBidApi: string;

  private playerController: string;
  private pricesController: string;
  private marketController: string;
  private auctionController: string;
  private userController: string;
  private bidController: string;

  constructor(private http: HttpClient) {
    this.playerController = 'player';
    this.pricesController = 'prices';
    this.marketController = 'market';
    this.auctionController = 'auction';
    this.userController = 'users';
    this.bidController = 'auction';

    this.urlPlayerApi = this.apiUrl + this.playerController;
    this.urlPlayerPricesApi = this.apiUrl + this.pricesController;
    this.urlMarketApi = this.apiUrl + this.marketController;
    this.urlAuctionApi = this.apiUrl + this.auctionController;
    this.urlUserApi = this.apiUrl + this.userController + '/' + this.userId;
    this.urlBidApi = this.apiUrl + this.bidController;
  }

  getMarketSettings(): Observable<any[]> {
    return this.http.get<any[]>(this.urlMarketApi);
  }

  getAuctionPlayers(): Observable<any> {
    return this.http.get<any[]>(this.urlAuctionApi);
  }

  getUserFunds(): Observable<any> {
    return this.http.get<any[]>(this.urlUserApi);
  }

  bidPlayer(bidData: selectedPlayerDTO): Observable<any> {
    return this.http.post<selectedPlayerDTO>(`${this.urlBidApi}`, bidData);
  }
}
