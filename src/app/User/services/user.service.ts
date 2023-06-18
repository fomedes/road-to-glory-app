import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiBaseUrl;

  private urlUserApi: string;

  private userController: string;

  constructor(private http: HttpClient) {
    this.userController = 'users';

    this.urlUserApi = this.apiUrl + this.userController;
  }

  registerUser(user: UserDTO): Observable<any> {
    return this.http.post<UserDTO>(`${this.urlUserApi}`, user);
  }
}
