import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthDTO } from '../models/auth.dto';
import { SharedService } from './shared.service';

export interface AuthToken {
  username: string;
  user_id: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi: string;
  private controller: string;

  public httpInterceptor: (
    request: HttpRequest<any>,
    next: HttpHandler
  ) => Observable<HttpEvent<any>> = (request, next) => {
    const token = Cookies.get('access_token');
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next.handle(request);
  };

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'login';
    this.urlApi = environment.apiUrl + this.controller;
  }

  login(auth: AuthDTO): Observable<AuthToken> {
    return this.http.post<AuthToken>(this.urlApi, auth);
    // .pipe(catchError(this.sharedService.handleError));
  }

  public getToken(): string | null {
    const user = localStorage.getItem('user');
    if (!user) {
      console.log('No user found');
      return null;
    }
    const parsedUser = JSON.parse(user);
    return parsedUser.user_id;
  }

  public getUserId(): string | null {
    const user = localStorage.getItem('user');
    if (!user) {
      console.log('No user found');
      return null;
    }
    const parsedUser = JSON.parse(user);
    return parsedUser.user_id;
  }

  public saveUser(user: {}) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
