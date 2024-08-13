import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'market';
    this.urlApi = 'http://localhost:3000/api/' + this.controller;
  }
  bidPlayer(bidDetails: any): Observable<any> {
    return this.http.post(this.urlApi + '/bid', bidDetails);
  }
}
