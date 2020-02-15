import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(
    private http: HttpClient
  ) { }

  getCount() {
    return this.http.get(AppConfig.BASE_URL + 'stats/count/', {});
  }

  getCategoryCount() {
    return this.http.get(AppConfig.BASE_URL + 'stats/category-count/', {});
  }
  // getUserCount(){
  //   return this.http.get(AppConfig.BASE_URL + 'stats/usercounts/', {});
  // }
  getUserModelCount() {
    return this.http.get(AppConfig.BASE_URL + 'stats/usermodel-count', {});
  }

}
