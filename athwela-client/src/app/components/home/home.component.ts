import { Component, OnInit } from '@angular/core';

import { Campaign } from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign.service';

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
    this.campaignService.getRecentCampaignsList().subscribe((res) => {
      if (res['success']) this.campaignService.campaigns = res['campaigns'] as Campaign[];
    });
  }

}
