import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Campaign } from 'src/app/models/campaign.model';
import { User } from 'src/app/models/user.model';
import { AppConfig } from './../../config/app-config'

@Component({
  selector: 'app-campaign-donate',
  templateUrl: './campaign-donate.component.html',
  styleUrls: ['./campaign-donate.component.scss']
})
export class CampaignDonateComponent implements OnInit {
  closeBtnName: string;
  title: string;
  campaign: Campaign;
  user: User;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  merchantId = AppConfig.PAYHERE_MERCHANT;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    console.log(this.campaign);
  }

  onDonateClick() {
   
  }
}
