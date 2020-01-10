import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { AppConfig } from '../config/app-config';
import { Campaign } from '../models/campaign.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getallusers(){ return this.http.get(AppConfig.BASE_URL + 'users/') }
  getmoderators(){ return this.http.get(AppConfig.BASE_URL + 'users/mod') }
  gettotalcount(){return this.http.get(AppConfig.BASE_URL + 'campaigns/count') }
   
  getUser(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'users/profile/' + id)
  }

  registerMod(user: User) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(AppConfig.BASE_URL + 'users/register/mod', user, { headers: headers }).pipe();
  }
}
