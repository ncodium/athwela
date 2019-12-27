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

  getCampaign(id: String) { return this.http.get(this.baseURL + id) }
  getCampaigns() { return this.http.get(this.baseURL) }
  getRecentCampaigns() { return this.http.get(this.baseURL + 'recent') }
  getPublishedCampaigns() { return this.http.get(this.baseURL + 'published') }
  getUnpublishedCampaigns() { return this.http.get(this.baseURL + 'unpublished') }
  getVerifiedCampaigns() { return this.http.get(this.baseURL + 'verified') }
  getUnverifiedCampaigns() { return this.http.get(this.baseURL + 'unverified') }
  getCategories() { return this.http.get(this.baseURL + 'categories') }

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

  createComment(id: String, body: String) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.post(this.baseURL + id + '/comment', { body: body }, httpOptions).pipe();
  }

  deleteComment(campaignId: String, commentId: String) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.delete(this.baseURL + campaignId + '/comment/' + commentId, httpOptions).pipe();
  }

  getUserCampaigns() {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.get(this.baseURL + 'user', httpOptions).pipe();
  }

  getUserCampaignsById(id: String) {
    return this.http.get(this.baseURL + 'user/' + id, {}).pipe();
  }
}
