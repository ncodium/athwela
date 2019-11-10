import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from '../../../interfaces/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.scss']
})
export class CampaignPageComponent implements OnInit {
  private routeSub: Subscription;
  private loading: Boolean;
  private campaign: Campaign;
  private campaignId: String;

  alerts: any = [];

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loading = true;

    this.routeSub = this.route.params.subscribe(params => {
      this.campaignId = params['id']; // acquire campaignId from URL and request campaign content
      this.refreshCampaign(this.campaignId);
    });
  }

  refreshCampaign(id: String) {
    this.campaignService.getCampaign(id).subscribe((res) => {
      if (res['success']) this.campaign = res['campaign'] as Campaign;
      this.loading = false;
    });
  }

  verifyCampaign() {
    this.campaignService.verifyCampaign(this.campaignId).subscribe((res) => {
      if (res) this.refreshCampaign(this.campaignId);
    });

    this.alerts.push({
      type: 'success',
      msg: `The campaign has been verified successfully`
    });
  }

  publishCampaign() {
    this.campaignService.publishCampaign(this.campaignId).subscribe((res) => {
      if (res) this.refreshCampaign(this.campaignId);
      this.alerts.push({
        type: 'success',
        msg: `The campaign has been published successfully`
      });
    })
  }

  unpublishCampaign() {
    this.campaignService.unpublishCampaign(this.campaignId).subscribe((res) => {
      if (res) this.refreshCampaign(this.campaignId);
      console.log(this.alerts);
      this.alerts.push({
        type: 'info',
        msg: `The campaign has been unpublished successfully`
      });
    });
  }
}
