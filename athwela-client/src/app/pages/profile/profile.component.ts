import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CampaignService } from 'src/app/services/campaign.service';
import { UserService } from 'src/app/services/user.service';
import { DonationService } from 'src/app/services/donation.service';
import { User } from '../../models/user.model';
import { Campaign } from '../../models/campaign.model';
import { Donation } from '../../models/donation.model';
import { Subscription } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { AppConfig } from 'src/app/config/app-config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './../../components/register/validators/confirm-password.validator';
import { ProfilePreviousWithdrawalsComponent } from 'src/app/components/profile-previous-withdrawals/profile-previous-withdrawals.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // helpers
  routeSub: Subscription;
  modalRef: BsModalRef;
  uploader: FileUploader;
  response: any;

  // user
  userId: string; // from URL
  user: User; // profile owner
  avatarUrl: string = 'assets/user.png'; // default avatar
  loggedInUser: User;
  visitor: boolean; // true if profile is visited by someone other than the user

  // data variables
  campaigns: Campaign[];
  donations: Donation[];
  receivedDonations: Donation[];
  notWithdrawenDonations: Donation[];
  donationsSum: number;
  receivedDonationsSum: number;
  notWithdrawenDonationsSum: number;

  // forms
  updateForm: FormGroup;
  withdrawForm: FormGroup;

  // bootstrap alerts
  alert: any;
  withdrawAlert: any;
  avatarAlert: any;

  // pagination helpers
  campaignsPage: number = 1;
  campaignsTotalItems: number;
  donationsPage: number = 1;
  donationsTotalItems: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private campaignService: CampaignService,
    private modalService: BsModalService,
    private donationService: DonationService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    // avatar uploader
    this.uploader = new FileUploader({
      url: AppConfig.BASE_URL + 'upload',
      itemAlias: 'photo',
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedMimeType: ['image/png', 'image/jpeg'] // will be loaded only PNG and JPG files
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id']; // acquire userId from URL

      if (this.authService.loggedIn() && this.userId) {
        // get logged in user
        this.loggedInUser = this.authService.getUser();

        if (this.userId == this.loggedInUser._id) {
          // redirect to profile route
          this.router.navigate(['/profile']); // use profile route instead
        }
        else {
          // not matching logged in user
          this.visitor = true;
          this.userService.getUser(this.userId).subscribe((res) => {
            if (res['success']) this.user = res['user'] as User;
            else this.router.navigate(['/page-not-found']); // incorrect id

            // load public data
            this.getUserCampaigns(this.userId);
            this.getUserDonations(this.userId);
            this.getUserDonationsSum(this.userId);
            this.getUserReceivedDonationsSum(this.userId);
          });
        }
      }
      else if (this.authService.loggedIn() && !this.userId) {
        // get logged in user
        this.user = this.authService.getUser();

        this.initForms();
        this.initAvatarUploader();

        // load all data
        this.getUserCampaigns(this.user._id);
        this.getUserDonations(this.user._id);
        this.getUserDonationsSum(this.user._id);
        this.getUserReceivedDonationsSum(this.user._id);
        this.getUserReceivedDonationsNotWithdrawen(this.user._id)
      }
      else if (!this.authService.loggedIn() && this.userId) {
        // logged out user visiting
        this.visitor = true;
        this.userService.getUser(this.userId).subscribe((res) => {
          if (res['success']) this.user = res['user'] as User;
          else this.router.navigate(['/page-not-found']);

          // load public data
          this.getUserCampaigns(this.userId);
          this.getUserDonations(this.userId);
          this.getUserDonationsSum(this.userId);
          this.getUserReceivedDonationsSum(this.userId);
        })
      }
      else {
        this.router.navigate(['/page-not-found']);
      }
    });
  }

  initForms() {
    this.updateForm = this.formBuilder.group({
      avatar: [],
      phone: [this.user.phone, [
        Validators.required
      ]],
      email: [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      password: [''],
      confirmPassword: [''],
      firstName: [this.user.firstName, [
        Validators.required
      ]],
      lastName: [this.user.lastName, [
        Validators.required
      ]],
      address: [this.user.address, [
        Validators.required
      ]],
      city: [this.user.city, [
        Validators.required
      ]],
    },
      { validator: ConfirmPasswordValidator.matchPassword }
    );

    this.withdrawForm = this.formBuilder.group({
      payee: ['', [
        Validators.required
      ]],
      bankName: ['', [
        Validators.required
      ]],
      bankAccount: ['', [
        Validators.required
      ]],
      donationIds: ['']
    });
  }

  initAvatarUploader() {
    // setting up avatar uploader
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.response = JSON.parse(response);
      alert('File uploaded successfully! Please update to permanently save your avatar.');
      this.avatar.setValue(AppConfig.BASE_URL + this.response.path);
    };
    this.uploader.onWhenAddingFileFailed = (item: any, response: any, options: any) => {
      alert('You cannot upload this file!\nPlease choose a picture with PNG or JPEG formats with size less than 5MB.');
    }
  }

  getUserCampaigns(id: string) {
    this.campaignService.getUserCampaignsPage(id, 0, 4).subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
    });

    this.campaignService.getUserCampaignsCount(id).subscribe((res) => {
      this.campaignsTotalItems = res['count'];
    })
  }

  getUserDonations(id: string) {
    this.donationService.getUserDonationsPage(id, 0, 4).subscribe((res) => {
      this.donations = res['donations'] as Donation[];
    });

    this.donationService.getUserDonationsCount(id).subscribe((res) => {
      this.donationsTotalItems = res['count'];
    })
  }

  getUserDonationsSum(id: string) {
    this.donationService.getUserDonationsSum(id).subscribe((res) => {
      this.donationsSum = res as number;
    });
  }

  getUserReceivedDonationsSum(id: string) {
    this.donationService.getUserReceivedDonations(id).subscribe((res) => {
      this.receivedDonationsSum = res['amount'] as number;
    });
  }

  getUserReceivedDonationsNotWithdrawen(id: string) {
    this.donationService.getUserReceivedDonationsNotWithdrawen(id).subscribe((res) => {
      this.notWithdrawenDonations = res['donations'] as Donation[];
      this.notWithdrawenDonationsSum = res['amount'] as number;

      this.donationIds.setValue(
        this.notWithdrawenDonations.map((d) => { return d._id })
      );

      if (this.notWithdrawenDonationsSum < AppConfig.MINIMUM_WITHDRAW) {
        this.withdrawForm.disable();
        this.withdrawAlert = {
          msg: "You can't withdraw because your remaining balance is less than minimum allowed amount.",
          type: 'danger'
        }
      }

    });
  }

  onUpdate() {
    const user: User = {
      _id: this.user._id,
      avatar: this.avatar.value,
      password: this.password.value,
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      address: this.address.value,
      city: this.city.value,
      phone: this.phone.value
    }

    this.authService.updateUser(user).subscribe((res) => {
      if (res['success']) {
        this.user = res['user'] as User;
        this.authService.storeUserProfile(this.user);

        // feedback
        this.alert = {
          type: 'success',
          msg: 'Your details have been updated successfully.'
        }
      }
      else {
        this.alert = {
          type: 'danger',
          msg: res['msg']
        }
      }
    })
  }

  onWithdraw() {
    const withdrawal = {
      donations: this.donationIds.value,
      bank_account: this.bankAccount.value,
      bank_name: this.bankName.value,
      payee_name: this.payee.value,
      owner: this.loggedInUser._id
    }

    this.donationService.withdraw(withdrawal).subscribe((res) => {
      if (res['success']) {
        // feedback
        this.withdrawAlert = {
          type: 'success',
          msg: 'Your request has been sent. Once it is verified funds will be transferred to your account.'
        }
      }
      else {
        this.withdrawAlert = {
          type: 'danger',
          msg: res['msg'] // unexpected error
        }
      }
    })
  }


  openPreviousWithdrawalsModal() {
    const initialState = {
      title: 'Previous withdrawals',
      userId: this.authService.getUser()._id
    };

    this.modalRef = this.modalService.show(
      ProfilePreviousWithdrawalsComponent,
      { initialState, class: 'modal-lg' }
    );

    this.modalRef.content.closeBtnName = 'Close';
  }

  campaignsPageChanged(event: any): void {
    this.campaignsPage = event.page;
    this.campaignService.getUserCampaignsPage(this.user._id, this.campaignsPage - 1, 4).subscribe((res) => {
      this.campaigns = res['campaigns'];
    })
  }

  donationsPageChanged(event: any): void {
    this.donationsPage = event.page;
    this.donationService.getUserDonationsPage(this.user._id, this.donationsPage - 1, 4).subscribe((res) => {
      this.donations = res['donations'] as Donation[];
    });
  }

  get avatar() {
    return this.updateForm.get('avatar');
  }

  get password() {
    return this.updateForm.get('password');
  }

  get confirmPassword() {
    return this.updateForm.get('confirmPassword');
  }

  get email() {
    return this.updateForm.get('email');
  }

  get phone() {
    return this.updateForm.get('phone');
  }

  get firstName() {
    return this.updateForm.get('firstName');
  }

  get lastName() {
    return this.updateForm.get('lastName');
  }

  get address() {
    return this.updateForm.get('address');
  }

  get city() {
    return this.updateForm.get('city');
  }

  get payee() {
    return this.withdrawForm.get('payee');
  }

  get bankName() {
    return this.withdrawForm.get('bankName');
  }

  get bankAccount() {
    return this.withdrawForm.get('bankAccount');
  }

  get donationIds() {
    return this.withdrawForm.get('donationIds');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onClose() {
    this.modalService.hide(1);
  }

  onWithdrawClose() {
    this.getUserReceivedDonationsNotWithdrawen(this.user._id);
    this.modalRef.hide();
  }
}
