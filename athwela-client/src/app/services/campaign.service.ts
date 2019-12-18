import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Campaign } from '../interfaces/campaign';

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

  getCampaign(id: String) { return this.http.get(this.baseURL + id) }
  getCampaignList() { return this.http.get(this.baseURL) }
  getCategories() { return this.http.get(this.baseURL + 'categories') }
  getRecentCampaignsList() { return this.http.get(this.baseURL + 'recent') }
  getPublishedCampaignsList() { return this.http.get(this.baseURL + 'published') }
  getUnpublishedCampaignsList() { return this.http.get(this.baseURL + 'unpublished') }
  getVerifiedCampaignsList() { return this.http.get(this.baseURL + 'verified') }
  getUnverifiedCampaignsList() { return this.http.get(this.baseURL + 'unverified') }

  publishCampaign(id: String) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.put(this.baseURL + id + '/publish', {}, httpOptions);
  }

  unpublishCampaign(id: String) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };
    return this.http.put(this.baseURL + id + '/unpublish', {}, httpOptions);
  }

  verifyCampaign(id: String) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.put(this.baseURL + id + '/verify', {}, httpOptions);
  }

  unverifyCampaign(id: String) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.put(this.baseURL + id + '/unverify', {}, httpOptions);
  }

  createCampaign(campaign: Campaign) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.post(this.baseURL, campaign, httpOptions).pipe();
  }

  getUserCampaignsList() {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.get(this.baseURL + 'user', httpOptions).pipe();
  }

  getUserCampaignsListById(id: String) {
    return this.http.get(this.baseURL + 'user/' + id, {}).pipe();
  }

}
