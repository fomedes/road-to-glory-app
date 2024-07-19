import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.urlApi = 'http://localhost:3000/api/' + this.controller;
    // this.urlApi =
    //   'https://api/api/' +
    //   this.controller;
  }

  register(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.urlApi + '/register', user);
    // .pipe(catchError(this.sharedService.handleError));
  }
}
