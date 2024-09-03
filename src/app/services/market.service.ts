import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'market';
    this.urlApi = environment.apiUrl + this.controller;
  }
  bidPlayer(bidDetails: any): Observable<any> {
    return this.http.post(this.urlApi + '/bid', bidDetails);
  }

  releasePlayer(saleDetails: any): Observable<any> {
    return this.http.post(this.urlApi + '/releasePlayer', saleDetails);
  }
}
