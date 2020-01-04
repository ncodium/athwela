import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-campaign-donate',
  templateUrl: './campaign-donate.component.html',
  styleUrls: ['./campaign-donate.component.scss']
})
export class CampaignDonateComponent implements OnInit {
  title: string;
  campaign: any;
  closeBtnName: string;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    console.log(this.campaign);
  }

  onDonateClick() {
   
  }
}
