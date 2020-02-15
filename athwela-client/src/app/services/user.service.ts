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
  getAllusers(){return this.http.get(AppConfig.BASE_URL + 'users/')}
  getUsers(){ return this.http.get(AppConfig.BASE_URL + 'users/user')  }
  getUsersCount(page:number){return this.http.get(AppConfig.BASE_URL+ 'users/user/count'+'?pagination=8&page='+page.toString());}
  getModerators(){ return this.http.get(AppConfig.BASE_URL + 'users/mod') }
  getAdministrators(){ return this.http.get(AppConfig.BASE_URL + 'users/admin') }
  gettotalcount(){return this.http.get(AppConfig.BASE_URL + 'campaigns/count') }
  getaprovedcount(){return this.http.get(AppConfig.BASE_URL + 'campaigns/approvedcount') }
  getcharts(){return this.http.get(AppConfig.BASE_URL + 'users/barchart')}
  deleteusers(id:String){return this.http.delete(AppConfig.BASE_URL + 'users/'+id)}
  
   
  getUser(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'users/profile/' + id)
  }
  registerUser(user: User) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(AppConfig.BASE_URL + 'users/register', user, { headers: headers }).pipe();
  }

  registerMod(user: User) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(AppConfig.BASE_URL + 'users/register/mod', user, { headers: headers }).pipe();
  }
  registerAdmin(user: User) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(AppConfig.BASE_URL + 'users/register/admin', user, { headers: headers }).pipe();
  }
}
