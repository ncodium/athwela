import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-admin-campaigns',
  templateUrl: './admin-campaigns.component.html',
  styleUrls: ['./admin-campaigns.component.scss'],
  providers: [CampaignService]
})
export class AdminCampaignsComponent implements OnInit {
  campaigns: Campaign[];
  publishedCampaigns: Campaign[];
  unpublishedCampaigns: Campaign[];
  verifiedCampaigns: Campaign[];
  unverifiedCampaigns: Campaign[];
  

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.getCampaigns();
    this.getPublishedCampaigns();
    this.getUnpublishedCampaigns();
    this.getVerifiedCampaigns();
    this.getUnverifiedCampaigns();
  }

  getCampaigns() {
    this.campaignService.getCampaigns().subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
    });
  }

  getPublishedCampaigns() {
    this.campaignService.getPublishedCampaigns().subscribe((res) => {
      this.publishedCampaigns = res['campaigns'] as Campaign[];
    });
  }

  getUnpublishedCampaigns() {
    this.campaignService.getUnpublishedCampaigns().subscribe((res) => {
      this.unpublishedCampaigns = res['campaigns'] as Campaign[];
    });
  }

  getVerifiedCampaigns() {
    this.campaignService.getVerifiedCampaigns().subscribe((res) => {
      this.verifiedCampaigns = res['campaigns'] as Campaign[];
    });
  }

  getUnverifiedCampaigns() {
    this.campaignService.getUnverifiedCampaigns().subscribe((res) => {
      this.unverifiedCampaigns = res['campaigns'] as Campaign[];
    });
  }
}

