import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { Campaign } from 'src/app/models/campaign.model';
import { User } from 'src/app/models/user.model';
import { DonationService } from '../../services/donation.service';
import { Subject } from 'rxjs';
import { Donation } from 'src/app/models/donation.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-campaign-donation-confirm',
  templateUrl: './campaign-donation-confirm.component.html',
  styleUrls: ['./campaign-donation-confirm.component.scss']
})
export class CampaignDonationConfirmComponent implements OnInit {
  public onClose: Subject<boolean>;

  // inputs
  closeBtnName: string;
  title: string;

  donationId: String;
  campaign: Campaign;
  user: User;
  donation: Donation;

  interval: any;
  error: HttpErrorResponse;

  constructor(
    public bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private donationService: DonationService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.onClose = new Subject();

    this.interval = setInterval(() => { this.refreshData() },
      5000 // 5 seconds
    );
  }

  onCancel() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  refreshData() {
    this.donationService.getDonation(this.donationId).subscribe(
      (res: Donation) => {
        this.donation = res;
        clearInterval(this.interval);
        this.spinner.hide();
      },
      error => {
        this.error = error
        console.log(this.error);
      });
  }

}