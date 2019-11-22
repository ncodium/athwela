import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Campaign } from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  campaigns: Campaign[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getUserCampaignList();
  }

  refreshUserCampaignList(user: User) {
    this.campaignService.getCampaignList().subscribe((res) => {
      if (res['success']) this.campaignService.campaigns = res['campaigns'] as Campaign[];
    });
  }

  getUserCampaignList() {
    this.campaignService.getCampaignList().subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
      console.log(this.campaigns);
    });
  }
}
