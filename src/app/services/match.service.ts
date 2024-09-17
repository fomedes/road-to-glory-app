import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'match';
    this.urlApi = environment.apiUrl + this.controller;
  }

  addMatchResults (matchData:any) {
    return this.http.patch<any>(this.urlApi + '/updateMatch/' + matchData.id, matchData);
  }
}
