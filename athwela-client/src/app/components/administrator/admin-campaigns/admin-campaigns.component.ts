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
    this.getOngoingCampaigns();
    this.getUnpublishedCampaigns();
    this.getPublishedCampaigns();
    this.getVerifiedCampaigns();
    this.getUnverifiedCampaigns();
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
  getPublishedCampaigns() {
    this.campaignService.getPublishedCampaignsList().subscribe((res) => {
      this.publishedCampaigns = res['campaigns'] as Campaign[];
    });
  }
  getVerifiedCampaigns() {
    this.campaignService.getVerifiedCampaignsList().subscribe((res) => {
      this.verifiedCampaigns = res['campaigns'] as Campaign[];
    });
  }
  getUnverifiedCampaigns() {
    this.campaignService.getUnverifiedCampaignsList().subscribe((res) => {
      this.unverifiedCampaigns = res['campaigns'] as Campaign[];
    });
  }
}

