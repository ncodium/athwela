import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Campaign } from '../models/campaign.model';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getSearch(search: string) { return this.http.get(AppConfig.BASE_URL + 'campaigns//sort/' + search); }

}
