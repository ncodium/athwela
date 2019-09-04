import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { Campaign } from '../models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  selectedCampaign: Campaign;
  campaigns: Campaign[];
  readonly baseURL = 'http://localhost:3000/campaigns';

  constructor(private http: HttpClient) { }

  getCampaignList() {
    return this.http.get(this.baseURL);
  }
}
