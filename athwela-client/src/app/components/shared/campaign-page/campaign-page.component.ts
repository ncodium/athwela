import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { Campaign } from '../../../models/campaign.model';

@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.scss']
})
export class CampaignPageComponent implements OnInit {
  private routeSub: Subscription;
  private campaign: Campaign;
  private campaignId: String;

  constructor(private route: ActivatedRoute, private campaignService: CampaignService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id

      this.campaignId = params['id'];
      this.refreshCampaign(this.campaignId);
    });
  }

  refreshCampaign(id: String) {
    this.campaignService.getCampaign(id).subscribe((res) => {

      this.campaignService.selectedCampaign = res as Campaign;
      this.campaign = this.campaignService.selectedCampaign;
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
