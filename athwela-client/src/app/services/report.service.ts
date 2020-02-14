import { Injectable } from '@angular/core';
import { Campaign } from '../models/campaign.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../config/app-config';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
    
  ) { }

  getCampaignsbydate(start: Date,end: Date){
    return this.http.get(AppConfig.BASE_URL + 'campaigns/report/'+start+'/'+end)

  }
}
