import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from '../../models/campaign.model';
import { CampaignService } from 'src/app/services/campaign.service';
import { AuthService } from './../../services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.scss']
})
export class CampaignPageComponent implements OnInit {
  routeSub: Subscription;
  loading: Boolean;
  loadingComments: Boolean = true;
  campaign: Campaign;
  campaignId: String;

  alerts: any = [];

  loggedIn: Boolean;
  isAdmin: Boolean;
  isMod: Boolean;
  isUser: Boolean;
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.campaignId = params['id']; // acquire campaignId from URL and request campaign content
      this.refreshCampaign(this.campaignId);
    });

    this.authReset()
  }

  authReset() {
    this.loggedIn = this.authService.loggedIn();
    if (this.loggedIn) {
      this.user = this.authService.getUser();
      this.isAdmin = this.user.role == 'admin';
      this.isMod = this.user.role == 'mod';
      this.isUser = this.user.role == 'user';
    }
    else {
      this.user = null;
      this.isAdmin = this.isMod = this.isUser = false;
    }
  }

  refreshCampaign(id: String) {
    this.campaignService.getCampaign(id).subscribe((res) => {
      if (res['success']) {
        this.campaign = res['campaign'] as Campaign;
        this.loadingComments = false;
      }
      else {
        this.router.navigate(['/page-not-found']);
      }
    });
  }

  verifyCampaign() {
    this.campaignService.verifyCampaign(this.campaignId).subscribe((res) => {
      if (res) this.refreshCampaign(this.campaignId);
      this.alerts.push({
        type: 'success',
        msg: `The campaign has been verified successfully.`
      });
    });
  }

  publishCampaign() {
    this.campaignService.publishCampaign(this.campaignId).subscribe((res) => {
      if (res) this.refreshCampaign(this.campaignId);
      this.alerts.push({
        type: 'success',
        msg: `The campaign has been published successfully.`
      });
    })
  }

  unpublishCampaign() {
    this.campaignService.unpublishCampaign(this.campaignId).subscribe((res) => {
      if (res) this.refreshCampaign(this.campaignId);
      this.alerts.push({
        type: 'info',
        msg: `The campaign has been unpublished successfully.`
      });
    });
  }

  onCommentSubmit(body: String) {
    this.loadingComments = true;
    this.campaignService.createComment(this.campaignId, body).subscribe((res) => {
      this.refreshCampaign(this.campaignId);

      this.alerts.push({
        type: 'success',
        msg: `Your comment has been posted successfully.`
      });

      this.loadingComments = false;
    })
  }

  onDelete(commentId: String) {
    this.loadingComments = true;
    this.campaignService.deleteComment(this.campaignId, commentId).subscribe((res) => {
      this.refreshCampaign(this.campaignId);

      this.alerts.push({
        type: 'success',
        msg: `Your comment has been deleted successfully.`
      });

      this.loadingComments = false;
    })
  }
}
