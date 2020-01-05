import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Campaign } from '../models/campaign.model';
import { AppConfig } from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  selectedCampaign: Campaign;
  campaigns: Campaign[];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCampaign(id: String) { return this.http.get(AppConfig.BASE_URL + 'campaigns/' + id) }
  getCampaigns() { return this.http.get(AppConfig.BASE_URL + 'campaigns/') }
  getRecentCampaigns() { return this.http.get(AppConfig.BASE_URL + 'campaigns/recent') }
  getPublishedCampaigns() { return this.http.get(AppConfig.BASE_URL + 'campaigns/published') }
  getUnpublishedCampaigns() { return this.http.get(AppConfig.BASE_URL + 'campaigns/unpublished') }
  getVerifiedCampaigns() { return this.http.get(AppConfig.BASE_URL + 'campaigns/verified') }
  getUnverifiedCampaigns() { return this.http.get(AppConfig.BASE_URL + 'campaigns/unverified') }
  getCategories() { return this.http.get(AppConfig.BASE_URL + 'campaigns/categories') }

  publishCampaign(id: String) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.put(AppConfig.BASE_URL + 'campaigns/' + id + '/publish', {}, httpOptions);
  }

  unpublishCampaign(id: String) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };
    return this.http.put(AppConfig.BASE_URL + 'campaigns/' + id + '/unpublish', {}, httpOptions);
  }

  verifyCampaign(id: String) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.put(AppConfig.BASE_URL + 'campaigns/' + id + '/verify', {}, httpOptions);
  }

  unverifyCampaign(id: String) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.put(AppConfig.BASE_URL + 'campaigns/' + id + '/unverify', {}, httpOptions);
  }

  createCampaign(campaign: Campaign) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.post(AppConfig.BASE_URL + 'campaigns/', campaign, httpOptions).pipe();
  }

  createComment(id: String, body: String) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.post(AppConfig.BASE_URL + 'campaigns/' + id + '/comment', { body: body }, httpOptions).pipe();
  }

  deleteComment(campaignId: String, commentId: String) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.delete(AppConfig.BASE_URL + 'campaigns/' + campaignId + '/comment/' + commentId, httpOptions).pipe();
  }

  getUserCampaigns(id: String) {
    return this.http.get(AppConfig.BASE_URL + 'campaigns/user/' + id, {}).pipe();
  }
}
