import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { Campaign } from 'src/app/models/campaign.model';
import { User } from 'src/app/models/user.model';
import { DonationService } from '../../services/donation.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-campaign-donation-confirm',
  templateUrl: './campaign-donation-confirm.component.html',
  styleUrls: ['./campaign-donation-confirm.component.scss']
})
export class CampaignDonationConfirmComponent implements OnInit {
  public onClose: Subject<boolean>;

  // input
  closeBtnName: string;
  title: string;
  campaign: Campaign;
  user: User;
  donationId: String;
  donation: any;
  interval: any;

  constructor(
    public bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private donationService: DonationService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.onClose = new Subject();

    this.interval = setInterval(() => {
      /** refresh every 5 seconds */
      this.refreshData();
    }, 5000);

  }

  onCancel() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  refreshData() {
    this.donationService.getDonation(this.donationId).subscribe((res) => {
      if (res['success']) {
        this.donation = res['donation'];
        if (this.donation) {
          clearInterval(this.interval);
          this.spinner.hide();
        }
      }
    });
  }

}