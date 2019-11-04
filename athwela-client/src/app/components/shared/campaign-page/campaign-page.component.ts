import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { CampaignExtended } from '../../../models/campaign-extended.model';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.scss']
})
export class CampaignPageComponent implements OnInit {
  private routeSub: Subscription;
  private campaign: CampaignExtended;
  private campaignId: String;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.campaignId = params['id']; // acquire campaignId from URL and request campaign content
      this.refreshCampaign(this.campaignId);
    });
  }

  refreshCampaign(id: String) {
    this.campaignService.getCampaign(id).subscribe((res) => {
      if (res['success']) this.campaign = res['campaign'] as CampaignExtended;
    });
  }

  verifyCampaign() {
    this.campaignService.verifyCampaign(this.campaignId).subscribe((res) => {
      if (res['success']) this.campaign = res['campaign'] as CampaignExtended;
    });

    this.refreshCampaign(this.campaignId);
    console.log(this.campaign);
  }

  ngOnDestroy() { this.routeSub.unsubscribe() }
}
