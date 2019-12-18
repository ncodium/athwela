import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

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
}
