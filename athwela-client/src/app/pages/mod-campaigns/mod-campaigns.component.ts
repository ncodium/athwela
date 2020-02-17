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

  pageChanged(event: any): void {
    this.page = event.page;

    this.campaignService.getCampaignsPagination(this.page).subscribe((res) => {
      this.campaigns = res['campaigns'];
    });

    // this.campaignService.getVerifiedCampaignsPagination(this.page).subscribe((res) => {
    //   this.verifiedCampaigns = res['campaigns'];
    // });

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
      this.resCount = res['campaignsCount'];
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
