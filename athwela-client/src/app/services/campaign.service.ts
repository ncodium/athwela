import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { Campaign } from '../models/campaign.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  readonly baseURL = 'http://localhost:3000/campaigns';

  selectedCampaign: Campaign;
  campaigns: Campaign[];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCampaignList() {
    return this.http.get(this.baseURL);
  }

  createCampaign(campaign: Campaign) {
    this.authService.loadToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.authToken
      })
    };

    return this.http.post(this.baseURL, campaign, httpOptions).pipe();
  }


}
