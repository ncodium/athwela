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
  currentPage: number; // use for pagination
  page: number;
  resCount: number;

  resCampaign: string;
  res: string;

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

//   pageChanged(event: any): void {
//     this.page = event.page;
//     this.campaignService.getCampaigns(this.page).subscribe((res) => {
//       this.campaigns = res['campaigns'] as Campaign[];
//     });

//     this.campaignService.getPublishedCampaigns(this.page).subscribe((res) => {
//       this.publishedCampaigns = res['campaigns'] as Campaign[];
//     });

//     this.campaignService.getUnpublishedCampaigns().subscribe((res) => {
//       this.unpublishedCampaigns = res['campaigns'] as Campaign[];
//     });

//     this.campaignService.getVerifiedCampaigns().subscribe((res) => {
//       this.verifiedCampaigns = res['campaigns'] as Campaign[];
//     });

//     this.campaignService.getUnverifiedCampaigns().subscribe((res) => {
//       this.unverifiedCampaigns = res['campaigns'] as Campaign[];
//     });
//  }

  getCampaigns() {     this.campaignService.getCampaigns().subscribe((res) => {
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

