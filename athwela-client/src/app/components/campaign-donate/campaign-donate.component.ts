import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Campaign } from 'src/app/models/campaign.model';
import { User } from 'src/app/models/user.model';
import { AppConfig } from './../../config/app-config'
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-campaign-donate',
  templateUrl: './campaign-donate.component.html',
  styleUrls: ['./campaign-donate.component.scss']
})
export class CampaignDonateComponent implements OnInit {
  // input
  closeBtnName: string;
  title: string;
  campaign: Campaign;
  user: User;

  // generated
  returnUrl: string;
  cancelUrl: string;
  notifyUrl: string;
  donationId: string;

  merchantId = AppConfig.PAYHERE_MERCHANT;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.donationId = UUID.UUID();
    this.cancelUrl = AppConfig.APP_URL + 'campaign/' + this.campaign._id;
    this.returnUrl = AppConfig.APP_URL + 'campaign/' + this.campaign._id;
    this.notifyUrl = AppConfig.BASE_URL + 'donations/' + this.campaign._id + '/' + this.user._id;
  }

  onDonateClick() {

  }
}
