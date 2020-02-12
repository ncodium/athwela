import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-campaign-page-verifier',
  templateUrl: './campaign-page-verifier.component.html',
  styleUrls: ['./campaign-page-verifier.component.scss']
})
export class CampaignPageVerifierComponent implements OnInit {
  user: string;
  profile: User;

  constructor(
    public bsModalRef: BsModalRef,
    public userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.userService.getUser(this.user).subscribe((res) => {
      this.profile = res['user'] as User;
      this.spinner.hide();
      console.log(this.profile.firstName);
    })
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
