import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CommunityDTO } from '../models/community.dto';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'communities';
    this.urlApi = environment.apiUrl + this.controller;
  }

  createCommunity(community: CommunityDTO): Observable<CommunityDTO> {
    return this.http.post<CommunityDTO>(this.urlApi + '/create', community);
  }

  getUserCommunities(user_id: string): Observable<CommunityDTO[]> {
    return this.http.get<CommunityDTO[]>(
      this.urlApi + '/userCommunities/' + user_id
    );
  }

  getAllCommunities(): Observable<CommunityDTO[]> {
    return this.http.get<CommunityDTO[]>(this.urlApi + '/all');
  }

  getDefaultPrices(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/player-prices.json');
  }

  getRegisteredPlayers(communityId: string): Observable<any[]> {
    return this.http.get<any[]>(
      this.urlApi + '/registeredPlayers/' + communityId
    );
  }
}
