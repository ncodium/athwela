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


  allresCount: number;
  publishresCount: number;
  verifyresCount: number;
  unverifyresCount: number;

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

  campaignsPageChanged(event: any): void {
    this.page = event.page;

    this.campaignService.getCampaignsPagination(this.page).subscribe((res) => {
      this.campaigns = res['campaigns'];
    });
  }

  publishPageChanged(event: any): void {
    this.page = event.page;

    this.campaignService.getPublishedCampaignsCatogory(this.page).subscribe((res) => {
      if (res['success']) this.publishedCampaigns = res['campaigns'] as Campaign[];
      // console.log('***##***' + this.activeCategory);
    });
  }

  veryfyPageChanged(event: any): void {
    this.page = event.page;

    this.campaignService.getVerifiedCampaignsPagination(this.page).subscribe((res) => {
      this.verifiedCampaigns = res['campaigns'];
    });
  }

  unveryfyPageChanged(event: any): void {
    this.page = event.page;

    this.campaignService.getUnverifiedCampaignsPagination(this.page).subscribe((res) => {
      this.unverifiedCampaigns = res['campaigns'];
      // console.log(this.verifiedCampaigns);
    });
  }

  getCampaigns() {
    this.campaignService.getCampaignsPagination(1).subscribe((res) => {
      this.campaigns = res['campaigns'];
    });
    this.campaignService.getCampaignsPaginationCount().subscribe((res) => {
      this.allresCount = res['campaignsCount'];
      // console.log(this.resCount);
    });
  }

  getPublishedCampaigns() {
    this.campaignService.getPublishedCampaignsCatogory(1).subscribe((res) => {
      if (res['success']) this.publishedCampaigns = res['campaigns'] as Campaign[];
      // console.log('***##***' + this.activeCategory);
    });

    this.campaignService.getPublishedCategoryCount().subscribe((res) => {
      if (res['success']) this.publishresCount = res['categoriesCount'];
      // console.log('***##***' + this.resCount);
    });
  }

  getUnpublishedCampaigns() {
    this.campaignService.getUnpublishedCampaigns().subscribe((res) => {
      this.unpublishedCampaigns = res['campaigns'] as Campaign[];
    });
  }

  getVerifiedCampaigns() {
    this.campaignService.getVerifiedCampaignsPagination(1).subscribe((res) => {
      this.verifiedCampaigns = res['campaigns'];
      // console.log(this.verifiedCampaigns);
    });

    this.campaignService.getVerifiedCampaignsCount().subscribe((res) => {
      if (res['success']) this.verifyresCount = res['verifiedCount'];
      console.log('*@*@*@' + this.verifyresCount);
    });
    console.log('*@233*@*@' + this.verifyresCount);
  }

  getUnverifiedCampaigns() {
    this.campaignService.getUnverifiedCampaignsPagination(1).subscribe((res) => {
      this.unverifiedCampaigns = res['campaigns'];
      // console.log(this.verifiedCampaigns);
    });

    this.campaignService.getUnverifiedCampaignsCount().subscribe((res) => {
      if (res['success']) this.unverifyresCount = res['unverifiedCount'];
      console.log('*@*@UN*@' + this.unverifyresCount);
    });
    console.log('*@23UN3*@*@' + this.unverifyresCount);
  }
}

