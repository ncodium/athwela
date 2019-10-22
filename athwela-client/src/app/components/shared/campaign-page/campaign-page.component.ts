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
      // acquire campaignId from URL and request campaign content
      this.campaignId = params['id'];
      this.refreshCampaign(this.campaignId);
    });
  }

  refreshCampaign(id: String) {
    this.campaignService.getCampaign(id).subscribe((res) => {

      this.campaignService.selectedCampaign = res as CampaignExtended;
      this.campaign = this.campaignService.selectedCampaign;
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
