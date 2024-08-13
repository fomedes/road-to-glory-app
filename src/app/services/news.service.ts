import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'news';
    this.urlApi = 'http://localhost:3000/api/' + this.controller;
  }

  createNews(newsDetails: any): Observable<any> {
    return this.http.post<any>(this.urlApi + '/create', newsDetails);
  }

  getNews(communityId: string): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi + '/community/' + communityId);
  }
}
