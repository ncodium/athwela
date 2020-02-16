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

  getCampaign(id: string) { return this.http.get(AppConfig.BASE_URL + 'campaigns/' + id); }
  getCampaigns() { return this.http.get(AppConfig.BASE_URL + 'campaigns/'); }
  getRecentCampaigns() { return this.http.get(AppConfig.BASE_URL + 'campaigns/recent'); }
  getPublishedCampaigns() { return this.http.get(AppConfig.BASE_URL + 'campaigns/published'); }
  getUnpublishedCampaigns() { return this.http.get(AppConfig.BASE_URL + 'campaigns/unpublished'); }
  getVerifiedCampaigns() { return this.http.get(AppConfig.BASE_URL + 'campaigns/verified'); }
  getUnverifiedCampaigns() { return this.http.get(AppConfig.BASE_URL + 'campaigns/unverified'); }
  getCategories() { return this.http.get(AppConfig.BASE_URL + 'campaigns/categories'); }
  // getCategoryCampaign(category: string) { return this.http.get(AppConfig.BASE_URL + 'campaigns/categories/' + category ); }
  // getSortCampaign(currentSort: string) { return this.http.get(AppConfig.BASE_URL + 'campaigns/sort/' + currentSort ); }

  // tslint:disable-next-line: max-line-length // pagination category campaign
  getCategoryCampaign(category: string, page: number) { return this.http.get(AppConfig.BASE_URL + 'campaigns/categories/' + category + '?pagination=4&page=' + page.toString()); }
  getCategoryCount(category: string) { return this.http.get(AppConfig.BASE_URL + 'campaigns/categories/' + category + '/count'); }

  // pagination All campaigns
  getCampaignsPagination(page: number) { return this.http.get(AppConfig.BASE_URL + 'campaigns/pagination' + '?pagination=9&page=' + page.toString()); }
  getCampaignsPaginationCount() { return this.http.get(AppConfig.BASE_URL + 'campaigns/pagination/count'); }

  // pagination All verified campaigns
  getVerifiedCampaignsPagination(page: number) { return this.http.get(AppConfig.BASE_URL + 'campaigns/verified/pagination' + '?pagination=9&page=' + page.toString()); }
  getVerifiedCampaignsCount() { return this.http.get(AppConfig.BASE_URL + 'campaigns/verified/count'); }

  // pagination Sort data
  getSortCampaign(currentSort: string, page: number) { return this.http.get(AppConfig.BASE_URL + 'campaigns/sort/' + currentSort + '?pagination=4&page=' + page.toString()); }
  getSortCount(currentSort: string) { return this.http.get(AppConfig.BASE_URL + 'campaigns/sort/' + currentSort + '/count'); }

  // pagination publish campaigns
  getPublishedCampaignsCatogory(page: number) { return this.http.get(AppConfig.BASE_URL + 'campaigns/published/pagination' + '?pagination=4&page=' + page.toString()); }
  getPublishedCategoryCount() { return this.http.get(AppConfig.BASE_URL + 'campaigns/published/count'); }


  rejectCampaign(id: string, reject_message: string) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.put(AppConfig.BASE_URL + 'campaigns/' + id + '/reject', {
      reject_message: reject_message
    }, httpOptions);
  }

  unrejectCampaign(id: string) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.put(AppConfig.BASE_URL + 'campaigns/' + id + '/unreject', {}, httpOptions);
  }

  publishCampaign(id: string) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.put(AppConfig.BASE_URL + 'campaigns/' + id + '/publish', {}, httpOptions);
  }

  unpublishCampaign(id: string) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };
    return this.http.put(AppConfig.BASE_URL + 'campaigns/' + id + '/unpublish', {}, httpOptions);
  }

  verifyCampaign(id: string) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.put(AppConfig.BASE_URL + 'campaigns/' + id + '/verify', {}, httpOptions);
  }

  unverifyCampaign(id: string) {
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

  createComment(id: string, body: string) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.post(AppConfig.BASE_URL + 'campaigns/' + id + '/comment', { body: body }, httpOptions).pipe();
  }

  deleteComment(campaignId: string, commentId: string) {
    this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.authService.authToken
      })
    };

    return this.http.delete(AppConfig.BASE_URL + 'campaigns/' + campaignId + '/comment/' + commentId, httpOptions).pipe();
  }

  getUserCampaigns(id: string) {
    return this.http.get(AppConfig.BASE_URL + 'campaigns/user/' + id, {}).pipe();
  }

  getUserCampaignsPage(id: string, page: number, limit: number) {
    return this.http.get(AppConfig.BASE_URL + 'campaigns/user/' + id + '?page=' + page + '&limit=' + limit, {}).pipe();
  }

  getUserCampaignsCount(id: string) {
    return this.http.get(AppConfig.BASE_URL + 'campaigns/user/' + id + '/count', {}).pipe();
  }

}
