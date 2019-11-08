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
  allCampaigns: Campaign[];
  publishedCampaigns: Campaign[];
  unverifiedCampaigns: Campaign[];
  verifiedCampaigns: Campaign[];

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.getUnpublishedCampaigns();
    this.getOngoingCampaigns();
    this.getpublishedCampaigns();
    this.getverifiedCampaigns();
    this.getunverifiedCampaigns();
  }

  refreshCampaignList() {
    this.campaignService.getRecentCampaignsList().subscribe((res) => {
      this.campaignService.campaigns = res['campaigns'] as Campaign[];
    });
  }

  getOngoingCampaigns() {
    this.campaignService.getCampaignList().subscribe((res) => {
      this.allCampaigns = res['campaigns'] as Campaign[];
    });
  }

  getUnpublishedCampaigns() {
    this.campaignService.getUnpublishedCampaignsList().subscribe((res) => {
      this.unpublishedCampaigns = res['campaigns'] as Campaign[];
    });
  }
  getpublishedCampaigns() {
    this.campaignService.getPublishedCampaignsList().subscribe((res) => {
      this.publishedCampaigns = res['campaigns'] as Campaign[];
    });
  }
  getverifiedCampaigns() {
    this.campaignService.getVerifiedCampaignsList().subscribe((res) => {
      this.verifiedCampaigns = res['campaigns'] as Campaign[];
    });
  }
  getunverifiedCampaigns() {
    this.campaignService.getVerifiedCampaignsList().subscribe((res) => {
      this.unverifiedCampaigns = res['campaigns'] as Campaign[];
    });
  }
}

