import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';
//import 'rxjs/Rx';
import { map } from "rxjs/operators";
import { tokenNotExpired } from 'angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http: HttpClient
    ) { }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    .pipe();
    //.map(res => res.json());
    // .pipe(map((res: any) => res.json()));
    // .pipe(map((res: any) => {
    //   console.log('res', res);
    //   return res;
    // }));
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    .pipe();
  }

  getProfile(){
    this.loadToken();
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    // let headers = new HttpHeaders();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', this.authToken);

    return this.http.get('http://localhost:3000/users/profile', httpOptions)
    .pipe();
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.authToken);

  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}