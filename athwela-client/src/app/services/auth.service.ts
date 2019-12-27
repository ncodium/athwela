import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: User;
  role: String;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers }).pipe();
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers }).pipe();
  }

  updateUser(user) {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.post('http://localhost:3000/users/update/' + this.user._id, user, httpOptions).pipe();
  }

  getProfile() {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.get('http://localhost:3000/users/profile', httpOptions).pipe();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.user;
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
    this.authToken = token;
    this.user = user;
    this.role = user.role;
  }

  storeUserProfile(user) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
    this.user = user;
    this.role = user.role;
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  loggedIn() {
    const helper = new JwtHelperService();
    this.loadToken();
    return !helper.isTokenExpired(this.authToken);
    // TODO: Check if role embedded in token matches to locally stored role
  }

  logout() {
    localStorage.clear();
    this.authToken = this.user = this.role = null;
    this.router.navigate(['/']);
  }

  // helpers

  isAdmin() {
    this.role = localStorage.getItem('role');
    return this.role === 'admin';
  }

  isMod() {
    this.role = localStorage.getItem('role');
    return this.role === 'mod';
  }

  isUser() {
    this.role = localStorage.getItem('role');
    return this.role === 'user';
  }
}