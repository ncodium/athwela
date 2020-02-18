import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DonationService } from '../../services/donation.service';
import { Withdrawal } from 'src/app/models/withdrawal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile-previous-withdrawals',
  templateUrl: './profile-previous-withdrawals.component.html',
  styleUrls: ['./profile-previous-withdrawals.component.scss']
})
export class ProfilePreviousWithdrawalsComponent implements OnInit {
  userId: string; // provided by parent component
  withdrawals: Withdrawal[];

  constructor(
    public bsModalRef: BsModalRef,
    public donationService: DonationService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getUserWithdrawals();
  }

  getUserWithdrawals() {
    // show spinnner
    this.spinner.show();

    // retrieve withdrawals
    this.donationService.getUserWithdrawals(this.userId).subscribe((res: Withdrawal[]) => {
      this.withdrawals = res;
      this.spinner.hide()
    });
  }

}
