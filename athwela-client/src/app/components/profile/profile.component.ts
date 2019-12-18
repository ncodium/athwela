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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private routeSub: Subscription;
  private user: User;
  private currentUser: User;
  private userId: string;
  private visitor: boolean;

  private name: string;
  private email: string;
  private password: string;
  private passwordConfirm: string;

  private nameInvalid: boolean;
  private emailInvalid: boolean;
  private passwordInvalid: boolean;
  private passwordMismatch: boolean;

  modalRef: BsModalRef;
  campaigns: Campaign[];
  alerts: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private campaignService: CampaignService,
    private modalService: BsModalService,
    private validateService: ValidateService
  ) { }

  ngOnInit() {
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
              this.getUserCampaignList();
            }
            else {
              // current user is not the owner of the profile
              this.visitor = true;
              this.getUserCampaignListById(this.user._id);
            }
          })
        }
        else {
          // id not included in the url
          // not a visitor
          this.user = this.currentUser;
          this.visitor = false; // is the owner
          this.getUserCampaignList();
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

            this.getUserCampaignListById(this.user._id);
          })
        }
        else {
          // id not included in the url
          this.router.navigate(['/page-not-found']);
        }
      }
    });
  }

  getUserCampaignList() {
    this.campaignService.getUserCampaignsList().subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
    });
  }

  getUserCampaignListById(id: string) {
    this.campaignService.getUserCampaignsListById(id).subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
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
      console.log("lol");
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
