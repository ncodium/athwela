import { Component, OnInit } from '@angular/core';

import { CampaignService } from '../shared/campaign.service';
import { Campaign } from '../shared/campaign.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CampaignService]
})
export class HomeComponent implements OnInit {

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.refreshCampaignList();
  }

  refreshCampaignList() {
    this.campaignService.getCampaignList().subscribe((res) => {
      this.campaignService.campaigns = res as Campaign[];
    });
  }

}
