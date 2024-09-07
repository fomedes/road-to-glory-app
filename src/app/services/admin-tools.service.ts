import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminToolsService {

  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'budget';
    this.urlApi = environment.apiUrl + this.controller;
  }

  applyTeamBudgetAdjustment(adjustmentData: any){

    return this.http.post(this.urlApi + '/teamBudgetAdjustment', adjustmentData);
  }

}
