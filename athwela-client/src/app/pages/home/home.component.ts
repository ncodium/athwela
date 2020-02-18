import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RegisterComponent } from '../../components/register/register.component';
import { Campaign } from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CampaignService]
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  noCampaigns: boolean = true; // 

  constructor(
    private campaignService: CampaignService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.refreshCampaigns();
  }

  refreshCampaigns() {
    // show spinner
    this.spinner.show();

    // retrieve recent campaigns
    this.campaignService.getRecentCampaigns().subscribe((res) => {
      if (res['success']) {
        this.campaignService.campaigns = res['campaigns'] as Campaign[];
        this.noCampaigns = (this.campaignService.campaigns.length == 0);
      }

      // hide spinner
      this.spinner.hide();
    });
  }

  onGetStarted() {
    const initialState = {
      title: 'Get Started!',
      description: 'Please create an account on Athwela to create your fundraising campaign.'
    };

    this.modalRef = this.modalService.show(RegisterComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';
  }
}
