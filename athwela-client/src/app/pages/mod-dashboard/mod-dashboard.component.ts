import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CampaignService } from 'src/app/services/campaign.service';
import { UserService } from 'src/app/services/user.service';
import { DonationService } from 'src/app/services/donation.service';
import { ValidateService } from 'src/app/services/validate.service';
import { User } from '../../models/user.model';
import { Campaign } from '../../models/campaign.model';
import { Donation } from '../../models/donation.model';
import { Subscription } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { AppConfig } from 'src/app/config/app-config';


@Component({
  selector: 'app-mod-dashboard',
  templateUrl: './mod-dashboard.component.html',
  styleUrls: ['./mod-dashboard.component.scss'],
  providers: [CampaignService]
})
export class ModDashboardComponent implements OnInit {
  alerts: any = [];
  routeSub: Subscription;
  modalRef: BsModalRef;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: any;

  user: User;
  userId: string;
  currentUser: User;
  visitor: boolean;
  campaigns: Campaign[];
  donations: Donation[];

  noCampaigns: boolean = true;
  noDonations: boolean = true;

  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  nameInvalid: boolean;
  emailInvalid: boolean;
  passwordInvalid: boolean;
  passwordMismatch: boolean;
  avatar: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private campaignService: CampaignService,
    private modalService: BsModalService,
    private validateService: ValidateService,
    private donationService: DonationService
  ) {
    this.uploader = new FileUploader({
      url: AppConfig.BASE_URL + 'upload',
      itemAlias: 'photo',
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedMimeType: ['image/png', 'image/jpeg'] //will be loaded only PNG and JPG files
    });
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile['user'];
    },
      err => {
        console.log(err);
        return false;
      }
    );

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.response = JSON.parse(response);
      alert('File uploaded successfully!');
      this.avatar = AppConfig.BASE_URL + this.response.path;
    };
    this.uploader.onWhenAddingFileFailed = (item: any, response: any, options: any) => {
      alert('You cannot upload this file!\nPlease choose a picture with PNG or JPEG formats with size less than 5MB.');
    }
  }
  
  openSettings(template: TemplateRef<any>) {
    this.alerts = [];
    this.modalRef = this.modalService.show(template);
  }

  onUpdateSubmit() {
    this.nameInvalid = this.emailInvalid = this.passwordInvalid = this.passwordMismatch = false;

    if (!this.name && !this.email && !this.password && !this.passwordConfirm) {
      this.modalRef.hide();
    }

    if (this.password) {
      if (this.password != this.passwordConfirm) {
        this.passwordInvalid = this.passwordMismatch = true;
        this.alerts = [
          {
            type: 'warning',
            msg: `Your passwords don't match. Please try again!`
          }
        ];

        return;
      }
      else {
        // update password
        this.user.password = this.password;
        this.password = this.passwordConfirm = '';
      }
    }

    if (this.name) {
      // update name
      this.user.name = this.name;
    }

    if (this.avatar) {
      // update avatar
      this.user.avatar = this.avatar;
    }

    if (this.email) {
      if (!this.validateService.validateEmail(this.email)) {
        this.emailInvalid = true;
        this.alerts = [
          {
            type: 'warning',
            msg: 'Please enter a valid e-mail address'
          }
        ];
        return;
      }
      else {
        // update email
        this.user.email = this.email;
      }
    }

    this.authService.updateUser(this.user).subscribe(data => {
      if (data['success']) {
        this.alerts = [
          {
            type: 'success',
            msg: `Your details were updated successfully.`
          }
        ];
        this.userService.getUser(this.user._id).subscribe((res) => {
          if (res['success']) this.user = res['user'] as User;
          this.authService.storeUserProfile(this.user);
        });
      }
      else {
        this.alerts = [
          {
            type: 'danger',
            msg: data
          }
        ];
      }
    })
  }
}
