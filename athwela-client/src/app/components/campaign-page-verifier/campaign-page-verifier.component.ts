import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-campaign-page-verifier',
  templateUrl: './campaign-page-verifier.component.html',
  styleUrls: ['./campaign-page-verifier.component.scss']
})
export class CampaignPageVerifierComponent implements OnInit {
  constructor(
    public bsModalRef: BsModalRef,
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
