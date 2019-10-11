import { Component, OnInit } from '@angular/core';

import { CampaignService } from '../../services/campaign.service';
import { CampaignExtended } from '../../models/campaign-extended.model';

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
      this.campaignService.campaigns = res as CampaignExtended[];
    });
  }

}
