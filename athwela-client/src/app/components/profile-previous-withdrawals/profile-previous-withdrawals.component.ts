import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile-previous-withdrawals',
  templateUrl: './profile-previous-withdrawals.component.html',
  styleUrls: ['./profile-previous-withdrawals.component.scss']
})
export class ProfilePreviousWithdrawalsComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

}
