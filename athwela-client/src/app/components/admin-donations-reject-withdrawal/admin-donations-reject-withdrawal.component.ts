import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-donations-reject-withdrawal',
  templateUrl: './admin-donations-reject-withdrawal.component.html',
  styleUrls: ['./admin-donations-reject-withdrawal.component.scss']
})
export class AdminDonationsRejectWithdrawalComponent implements OnInit {
  public onClose: Subject<boolean>;
  withdrawalId: string;
  
  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.onClose = new Subject();

  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  onReject() {
    this.onClose.next(true); // trigger refresh on admin-donations
    this.bsModalRef.hide();
  }

}
