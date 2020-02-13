import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Campaign } from '../models/campaign.model';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  selectedCampaign: Campaign;
  campaigns: Campaign[];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

 getSearch(search: string , page: number) { return this.http.get(AppConfig.BASE_URL + 'search/campaigns/' + search + '?pagination=9&page=' + page.toString()); }

}
