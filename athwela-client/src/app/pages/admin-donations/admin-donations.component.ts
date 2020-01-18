import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SingleDataSet } from 'ng2-charts';
import { NgxSpinnerService } from "ngx-spinner";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DonationService } from 'src/app/services/donation.service';
import { Donation } from '../../models/donation.model';
import { Withdrawal } from '../../models/withdrawal';

@Component({
  selector: 'app-admin-donations',
  templateUrl: './admin-donations.component.html',
  styleUrls: ['./admin-donations.component.scss']
})
export class AdminDonationsComponent implements OnInit {
  @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;
  donations: Donation[];
  withdrawals: Withdrawal[];
  alert: any;
  messages: string[];

  constructor(
    private donationService: DonationService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
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

  onApprove(id: string) {
    this.spinner.show();
    this.donationService.approveWithdrawal(id).subscribe((res) => {
      this.getWithdrawals();
      this.spinner.hide();
    })
  }

  onReject(id: string) {
    this.showModal();
  }

  showModal() {
    this.messages = [];
    this.modal.show();
    console.log('showing');
  }

  handler(type: string, $event: ModalDirective) {
    this.messages.push(
      `event ${type} is fired${$event.dismissReason
        ? ', dismissed by ' + $event.dismissReason
        : ''}`
    );
  }
}
