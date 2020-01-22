import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-admin-donations-reject-withdrawal',
  templateUrl: './admin-donations-reject-withdrawal.component.html',
  styleUrls: ['./admin-donations-reject-withdrawal.component.scss']
})
export class AdminDonationsRejectWithdrawalComponent implements OnInit {
  public onClose: Subject<boolean>;
  rejectForm: FormGroup;
  withdrawalId: string;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    public donationService: DonationService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.rejectForm = this.formBuilder.group({
      reason: ['']
    });

  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  onReject(reason: string) {
    this.donationService.rejectWithdrawal(this.withdrawalId, reason).subscribe((res) => {
      this.onClose.next(true); // trigger refresh on admin-donations
      this.bsModalRef.hide();
    })
  }

  get reason() {
    return this.rejectForm.get('reason');
  }
}
