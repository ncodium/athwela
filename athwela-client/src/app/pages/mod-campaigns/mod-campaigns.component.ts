import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/campaign.model';

@Component({
  selector: 'app-mod-campaigns',
  templateUrl: './mod-campaigns.component.html',
  styleUrls: ['./mod-campaigns.component.scss']
})
export class ModCampaignsComponent implements OnInit {
  user: Object;
  // verifiedCampaigns: any;
  verifiedCampaigns: Campaign[];
  unverifiedCampaigns: Campaign[];
  campaigns: any;

  currentPage: number; // use for pagination
  page: number;
  resCount: number;

  resCampaign: string;
  res: string;

  allresCount: number;
  verifyresCount: number;
  unverifyresCount: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private campaignService: CampaignService
  ) { }

  ngOnInit() {

    this.getCampaigns();
    this.getUnverifiedCampaigns();
    this.getVerifiedCampaigns();
    this.authService.getProfile().subscribe(profile => {
      this.user = profile['user'];
    },
      err => {
        // console.log(err);
        return false;
      }
    );
  }

  // get all campaigns data by page number
  pageChanged(event: any): void {
    this.page = event.page;

    this.campaignService.getCampaignsPagination(this.page).subscribe((res) => {
      this.campaigns = res['campaigns'];
    });

  }

  // get verified campaigns data by page number
  veryfyPageChanged(event: any): void {
    this.page = event.page;

    this.campaignService.getVerifiedCampaignsPagination(this.page).subscribe((res) => {
      this.verifiedCampaigns = res['campaigns'];
    });
  }

  // get unverified campaigns data by page number
  unveryfyPageChanged(event: any): void {
    this.page = event.page;

    this.campaignService.getUnverifiedCampaignsPagination(this.page).subscribe((res) => {
      this.unverifiedCampaigns = res['campaigns'];

    });
  }

  // get campaigns data for page 1 and get all campaigns data count
  getCampaigns() {
    this.campaignService.getCampaignsPagination(1).subscribe((res) => {
      this.campaigns = res['campaigns'];
    });
    this.campaignService.getCampaignsPaginationCount().subscribe((res) => {
      this.resCount = res['campaignsCount'];
    });
  }

  // get verified campaigns data for page 1 and get all verified campaigns data count
  getVerifiedCampaigns() {
    this.campaignService.getVerifiedCampaignsPagination(1).subscribe((res) => {
      this.verifiedCampaigns = res['campaigns'];
    });

    this.campaignService.getVerifiedCampaignsCount().subscribe((res) => {
      if (res['success']) this.verifyresCount = res['verifiedCount'];
    });
  }

  // get unverified campaigns data for page 1 and get all unverified campaigns data count
  getUnverifiedCampaigns() {
    this.campaignService.getUnverifiedCampaignsPagination(1).subscribe((res) => {
      this.unverifiedCampaigns = res['campaigns'];
    });

    this.campaignService.getUnverifiedCampaignsCount().subscribe((res) => {
      if (res['success']) this.unverifyresCount = res['unverifiedCount'];
    });
  }

}
