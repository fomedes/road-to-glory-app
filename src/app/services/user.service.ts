import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlApi: string;
  private controller: string;

  constructor(
    private http: HttpClient // private sharedService: SharedService
  ) {
    this.controller = 'users';
    this.urlApi = environment.apiUrl + this.controller;
  }

  register(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.urlApi + '/register', user);
    // .pipe(catchError(this.sharedService.handleError));
  }
}
