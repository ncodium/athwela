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
  verifiedCampaigns: any;
  unverifiedCampaigns: Campaign[];
  campaigns: any;

  currentPage: number; // use for pagination
  page: number;
  resCount: number;

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

    // this.campaignService.getCampaignsPaginationCount().subscribe((res) => {
    //   this.resCount = res['campaignsCount'];
    // });
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
    this.campaignService.getVerifiedCampaigns().subscribe((res) => {
      this.verifiedCampaigns = res['campaigns'];
    });
  }

  getUnverifiedCampaigns() {
    this.campaignService.getUnverifiedCampaigns().subscribe((res) => {
      this.unverifiedCampaigns = res['campaigns'] as Campaign[];
    });
  }
}
