import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { Campaign } from '../models/campaign.model';
import { AuthService } from './auth.service';
import { CampaignExtended } from '../models/campaign-extended.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  readonly baseURL = 'http://localhost:3000/campaigns/';

  selectedCampaign: CampaignExtended;
  campaigns: CampaignExtended[];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCampaignList() {
    return this.http.get(this.baseURL);
  }

  getRecentCampaignsList() {
    return this.http.get(this.baseURL + 'recent');
  }
   
  getunpublishedCampaignsList(){
    return this.http.get(this.baseURL+'unpublished');
  }

  getCampaign(id: String) {
    return this.http.get(this.baseURL + id);
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
