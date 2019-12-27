import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseURL = 'http://localhost:3000/users/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUser(id: String) {
    return this.http.get(this.baseURL + 'profile/' + id)
  }

  registerMod(user: User) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register/mod', user, { headers: headers }).pipe();
  }
}
