import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { DonationService } from 'src/app/services/donation.service';
import { Donation } from '../../models/donation.model';
import { Withdrawal } from '../../models/withdrawal';
import { AdminDonationsRejectWithdrawalComponent } from 'src/app/components/admin-donations-reject-withdrawal/admin-donations-reject-withdrawal.component';

@Component({
  selector: 'app-admin-donations',
  templateUrl: './admin-donations.component.html',
  styleUrls: ['./admin-donations.component.scss']
})
export class AdminDonationsComponent implements OnInit {
  modalRef: BsModalRef;

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
      this.donations = res as Donation[];
    });
  }

  getWithdrawals() {
    this.spinner.show();
    this.donationService.getWithdrawals().subscribe((res: Withdrawal[]) => {
      this.withdrawals = res;
      this.spinner.hide();
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
    const initialState = {
      title: 'Reject Withdrawal',
      withdrawalId: id
    };

    this.modalRef = this.modalService.show(AdminDonationsRejectWithdrawalComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';

    this.modalRef.content.onClose.subscribe(result => {
      this.getWithdrawals();
    })
  }


}
