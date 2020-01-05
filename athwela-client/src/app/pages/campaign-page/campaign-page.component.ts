import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from '../../models/campaign.model';
import { CampaignService } from 'src/app/services/campaign.service';
import { AuthService } from './../../services/auth.service';
import { User } from 'src/app/models/user.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CampaignDonateComponent } from '../../components/campaign-donate/campaign-donate.component';
import { CampaignDonationConfirmComponent } from '../../components/campaign-donation-confirm/campaign-donation-confirm.component';

@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.scss']
})
export class CampaignPageComponent implements OnInit {
  bsModalRef: BsModalRef;
  routeSub: Subscription;
  loading: Boolean;
  campaign: Campaign;
  campaignId: String;
  percentage: Number;
  percentageType: String;

  alerts: any = [];

  loggedIn: Boolean;
  isAdmin: Boolean;
  isMod: Boolean;
  isUser: Boolean;
  user: User;

  donationId: String;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private authService: AuthService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.campaignId = params['id']; // acquire campaignId from URL and request campaign content
      this.campaignService.getCampaign(this.campaignId).subscribe((res) => {
        if (res['success']) {
          this.campaign = res['campaign'] as Campaign;
          this.generatePercentage(this.campaign);

          this.route.queryParamMap.subscribe(queryParams => {
            this.donationId = queryParams.get("order_id");
            if (this.donationId) {
              const initialState = {
                title: "Donate",
                campaign: this.campaign,
                user: this.authService.getUser(),
                donationId: this.donationId
              };

              this.bsModalRef = this.modalService.show(CampaignDonationConfirmComponent, { initialState });
              this.bsModalRef.content.closeBtnName = 'Close';
            }
          })
        }
        else {
          this.router.navigate(['/page-not-found']);
        }
      });

    });



    this.authReset()
  }

  onDonateClick() {
    const initialState = {
      title: "Donate",
      campaign: this.campaign,
      user: this.authService.getUser()
    };

    this.bsModalRef = this.modalService.show(CampaignDonateComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
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
        this.generatePercentage(this.campaign);
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
    this.campaignService.createComment(this.campaignId, body).subscribe((res) => {
      this.refreshCampaign(this.campaignId);

      this.alerts.push({
        type: 'success',
        msg: `Your comment has been posted successfully.`
      });

    })
  }

  onDelete(commentId: String) {
    this.campaignService.deleteComment(this.campaignId, commentId).subscribe((res) => {
      this.refreshCampaign(this.campaignId);

      this.alerts.push({
        type: 'success',
        msg: `Your comment has been deleted successfully.`
      });

    })
  }

  generatePercentage(campaign: Campaign) {
    const percentage = campaign.raised / campaign.target * 100;
    if (percentage > 100) this.percentage = 100;
    else this.percentage = percentage;

    if (campaign.complete) {
      this.percentageType = 'success';
    }
    else {
      this.percentageType = 'info';
    }
  }
}
