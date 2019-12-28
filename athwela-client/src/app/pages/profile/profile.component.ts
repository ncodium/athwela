import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { Campaign } from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ValidateService } from 'src/app/services/validate.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { AppConfig } from 'src/app/config/app-config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
  avatar: string ="../../../assets/user.png";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private campaignService: CampaignService,
    private modalService: BsModalService,
    private validateService: ValidateService

  ) {
    this.uploader = new FileUploader({
      url: AppConfig.BASE_URL + 'upload',
      itemAlias: 'photo'
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.response = JSON.parse(response);
      alert('File uploaded successfully!');
      this.avatar = AppConfig.BASE_URL + this.response.path;
    };

    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id']; // acquire userId from URL

      if (this.authService.loggedIn()) {
        // user is logged in
        this.nameInvalid = this.emailInvalid = this.passwordInvalid = this.passwordMismatch = false;
        this.currentUser = this.authService.getUser(); // get logged in user

        if (this.userId) {
          // id included in the url
          this.userService.getUser(this.userId).subscribe((res) => {
            if (res['success']) this.user = res['user'] as User;
            else this.router.navigate(['/page-not-found']);

            // identify if the user is visitor or not
            if (this.user._id == this.currentUser._id) {
              // current user is the owner of the profile
              this.visitor = false;
              this.getUserCampaigns();
            }
            else {
              // current user is not the owner of the profile
              this.visitor = true;
              this.getUserCampaignsById(this.user._id);
            }
          })
        }
        else {
          // id not included in the url
          // not a visitor
          this.user = this.currentUser;
          this.visitor = false; // is the owner
          this.getUserCampaigns();
        }
      }
      else {
        // user is anonymous
        this.visitor = true;

        if (this.userId) {
          // id included in the url
          this.userService.getUser(this.userId).subscribe((res) => {
            if (res['success']) this.user = res['user'] as User;
            else this.router.navigate(['/page-not-found']);

            this.getUserCampaignsById(this.user._id);
          })
        }
        else {
          // id not included in the url
          this.router.navigate(['/page-not-found']);
        }
      }
    });
  }

  getUserCampaigns() {
    this.campaignService.getUserCampaigns().subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
      this.noCampaigns = (this.campaigns.length == 0);
    });
  }

  getUserCampaignsById(id: string) {
    this.campaignService.getUserCampaignsById(id).subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
      this.noCampaigns = (this.campaigns.length == 0);
    });
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
