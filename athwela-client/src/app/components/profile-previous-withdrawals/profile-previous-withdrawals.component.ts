import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DonationService } from '../../services/donation.service';
import { Withdrawal } from 'src/app/models/withdrawal';

@Component({
  selector: 'app-profile-previous-withdrawals',
  templateUrl: './profile-previous-withdrawals.component.html',
  styleUrls: ['./profile-previous-withdrawals.component.scss']
})
export class ProfilePreviousWithdrawalsComponent implements OnInit {
  userId: string;
  withdrawals: Withdrawal[];

  constructor(
    public bsModalRef: BsModalRef,
    public donationService: DonationService
  ) { }

  ngOnInit(
  ) {
    this.getUserWithdrawals();
  }

  getUserWithdrawals() {
    this.donationService.getUserWithdrawals(this.userId).subscribe((res) => {
      this.withdrawals = res['withdrawals'] as Withdrawal[];
    });
  }

}
