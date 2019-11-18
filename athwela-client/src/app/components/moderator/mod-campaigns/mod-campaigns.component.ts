import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';

import { CampaignService } from '../../../services/campaign.service';
import { Campaign } from '../../../models/campaign.model';

@Component({
  selector: 'app-mod-campaigns',
  templateUrl: './mod-campaigns.component.html',
  styleUrls: ['./mod-campaigns.component.scss']
})
export class ModCampaignsComponent implements OnInit {
  user: Object;
  verifiedcampaigns: any;
  unverifiedcampaigns: Campaign[];
  allcampaigns: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.refreshUnVerifiedCampaignList();
    this.authService.getProfile().subscribe(profile => {
      this.user = profile['user'];
    },
      err => {
        console.log(err);
        return false;
      }
    );
    this.refreshVerifiedCampaignList();
    this.refreshAllCampaignList();
  }

  refreshAllCampaignList() {
    this.campaignService.getCampaignList().subscribe((res) => {
      this.allcampaigns = res['campaigns'] ;
    });
  }

  refreshVerifiedCampaignList() {
    this.campaignService.getVerifiedCampaignsList().subscribe((res) => {
      this.verifiedcampaigns = res['campaigns'] ;
    });
  }

  refreshUnVerifiedCampaignList() {
    this.campaignService.getUnverifiedCampaignsList().subscribe((res) => {
      this.unverifiedcampaigns = res['campaigns'] as Campaign[];
    });
  }


  // refreshUnverifiedCampaignList() {
  //   this.campaignService.getUnverifiedCampaignsList().subscribe((res) => {
  //     this.unverifiedcampaigns = res['campaigns'] as Campaign[];
  //   });
  // }


}
