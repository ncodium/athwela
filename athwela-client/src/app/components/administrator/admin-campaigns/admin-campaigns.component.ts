import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../../services/campaign.service';
import { CampaignExtended } from '../../../models/campaign-extended.model';

@Component({
  selector: 'app-admin-campaigns',
  templateUrl: './admin-campaigns.component.html',
  styleUrls: ['./admin-campaigns.component.scss'],
  providers: [CampaignService]
})
export class AdminCampaignsComponent implements OnInit {
  unpublishedCampaigns: CampaignExtended[];
  ongoingCampaigns: CampaignExtended[];

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.unpublishedCampaignList();
    this.ongoingCampaignList();
  }
  refreshCampaignList() {
    this.campaignService.getRecentCampaignsList().subscribe((res) => {
      this.campaignService.campaigns = res as CampaignExtended[];
    });
  }
  ongoingCampaignList() {
    this.campaignService.getRecentCampaignsList().subscribe((res) => {
      this.ongoingCampaigns = res as CampaignExtended[];
    });
  }
  unpublishedCampaignList() {
    this.campaignService.getunpublishedCampaignsList().subscribe((res) => {
      this.unpublishedCampaigns= res as CampaignExtended[];
    });
  }

}

