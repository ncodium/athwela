import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';

import { CampaignService } from '../../../services/campaign.service';
<<<<<<< HEAD
import { Campaign } from '../../../models/campaign.model';
=======
import { Campaign} from '../../../models/campaign.model';
>>>>>>> 1bc775c6400bb3b20f7daedf85337940a80a74dd


@Component({
  selector: 'app-mod-campaigns',
  templateUrl: './mod-campaigns.component.html',
  styleUrls: ['./mod-campaigns.component.scss']
})
export class ModCampaignsComponent implements OnInit {
  user: Object;

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
  }

  refreshCampaignList() {
    this.campaignService.getRecentCampaignsList().subscribe((res) => {
      this.campaignService.campaigns = res['campaigns'] as Campaign[];
    });
  }


}
