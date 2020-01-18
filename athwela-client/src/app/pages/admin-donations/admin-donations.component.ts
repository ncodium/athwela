import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SingleDataSet } from 'ng2-charts';
import { DonationService } from 'src/app/services/donation.service';
import { Donation } from '../../models/donation.model';
import { Withdrawal } from '../../models/withdrawal';

@Component({
  selector: 'app-admin-donations',
  templateUrl: './admin-donations.component.html',
  styleUrls: ['./admin-donations.component.scss']
})
export class AdminDonationsComponent implements OnInit {
  donations: Donation[];
  withdrawals: Withdrawal[];
  alert: any;

  constructor(
    private donationService: DonationService,
    private modalService: BsModalService,
  ) { }
  ngOnInit() {
    this.getDonations();
    this.getWithdrawals();
  }

  getDonations() {
    this.donationService.getDonations().subscribe((res) => {
      this.donations = res['donations'] as Donation[];
    });
  }

  getWithdrawals() {
    this.donationService.getWithdrawals().subscribe((res) => {
      this.withdrawals = res['withdrawals'] as Withdrawal[];
    });
  }
}
