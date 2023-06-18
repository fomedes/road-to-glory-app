import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/Shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { AuthDTO } from '../models/auth.dto';

export interface AuthToken {
  userId: string;
  // future use access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  private urlUserApi: string;
  private loginController: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store,
    private sharedService: SharedService
  ) {
    this.loginController = 'users/login';

    this.urlUserApi = this.apiUrl + this.loginController;
  }

  login(auth: AuthDTO): Observable<AuthToken> {
    return this.http.post<AuthToken>(this.urlUserApi, auth);
  }
}
