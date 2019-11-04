import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Campaign } from '../models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  readonly baseURL = 'http://localhost:3000/campaigns/';

  selectedCampaign: Campaign;
  campaigns: Campaign[];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCampaignList() { return this.http.get(this.baseURL) }
  getRecentCampaignsList() { return this.http.get(this.baseURL + 'recent') }
  getUnpublishedCampaignsList() { return this.http.get(this.baseURL + 'unpublished') }
  getCampaign(id: String) { return this.http.get(this.baseURL + id) }
  verifyCampaign(id: String) { return this.http.put(this.baseURL + id + '/verify', {})}
  getCategories() { return this.http.get(this.baseURL + 'categories') }


  createCampaign(campaign: Campaign) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.post(this.baseURL, campaign, httpOptions).pipe();
  }
}
