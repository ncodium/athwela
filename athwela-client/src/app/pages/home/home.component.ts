import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RegisterComponent } from '../../components/register/register.component';
import { Campaign } from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CampaignService]
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  noCampaigns: boolean = true;

  constructor(
    private campaignService: CampaignService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.refreshCampaigns();
  }

  refreshCampaigns() {
    this.campaignService.getCampaigns().subscribe((res) => {
      if (res['success']) this.campaignService.campaigns = res['campaigns'] as Campaign[];
      this.noCampaigns = (this.campaignService.campaigns.length == 0);
    });
  }

  openRegisterModal() {
    const initialState = {
      title: 'Get Started!'
    };

    this.modalRef = this.modalService.show(RegisterComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';
  }
}