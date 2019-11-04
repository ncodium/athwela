import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../../models/campaign.model';
import { CampaignService } from '../../../services/campaign.service';

@Component({
  selector: 'app-admin-campaigns',
  templateUrl: './admin-campaigns.component.html',
  styleUrls: ['./admin-campaigns.component.scss'],
  providers: [CampaignService]
})
export class AdminCampaignsComponent implements OnInit {
  unpublishedCampaigns: Campaign[];
  ongoingCampaigns: Campaign[];

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.getUnpublishedCampaigns();
    this.getOngoingCampaigns();
  }

  refreshCampaignList() {
    this.campaignService.getRecentCampaignsList().subscribe((res) => {
      this.campaignService.campaigns = res['campaigns'] as Campaign[];
    });
  }

  getOngoingCampaigns() {
    this.campaignService.getRecentCampaignsList().subscribe((res) => {
      this.ongoingCampaigns = res['campaigns'] as Campaign[];
    });
  }

  getUnpublishedCampaigns() {
    this.campaignService.getUnpublishedCampaignsList().subscribe((res) => {
      this.unpublishedCampaigns = res['campaigns'] as Campaign[];
    });
  }
}

