import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'news';
    this.urlApi = environment.apiUrl + this.controller;
  }

  createNews(newsDetails: any): Observable<any> {
    return this.http.post<any>(this.urlApi + '/create', newsDetails);
  }

  getNews(communityId: string): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi + '/community/' + communityId);
  }
}
