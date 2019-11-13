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

  constructor(
    private authService: AuthService,
    private router: Router,
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.refreshCampaignList();
    this.authService.getProfile().subscribe(profile => {
      this.user = profile['user'];
    },
      err => {
        console.log(err);
        return false;
      }
    );
    this.refreshVerifiedCampaignListx();
  }

  refreshVerifiedCampaignListx() {
    this.campaignService.getVerifiedCampaignsList().subscribe((res) => {
      this.verifiedcampaigns = res['campaigns'] ;
    });
  }

  refreshCampaignList() {
    this.campaignService.getUnverifiedCampaignsList().subscribe((res) => {
      this.campaignService.campaigns = res['campaigns'] as Campaign[];
    });
  }


}
