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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  routeSub: Subscription;
  modalRef: BsModalRef;
  uploader: FileUploader;
  response: any;

  user: User;
  userId: string;
  _user: User;
  visitor: boolean;

  campaigns: Campaign[];
  donations: Donation[];
  donationsSum: number = 0;
  receivedDonations: Donation[];
  notWithdrawenDonations: Donation[];
  receivedDonationsSum: number = 0;
  notWithdrawenDonationsSum: number = 0;

  updateForm: FormGroup;
  withdrawForm: FormGroup;
  alert: any;
  withdrawAlert: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private campaignService: CampaignService,
    private modalService: BsModalService,
    private donationService: DonationService,
    private formBuilder: FormBuilder
  ) {
    this.uploader = new FileUploader({
      url: AppConfig.BASE_URL + 'upload',
      itemAlias: 'photo',
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedMimeType: ['image/png', 'image/jpeg'] // will be loaded only PNG and JPG files
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.response = JSON.parse(response);
      alert('File uploaded successfully!');
      this.avatar.setValue(AppConfig.BASE_URL + this.response.path);
    };
    this.uploader.onWhenAddingFileFailed = (item: any, response: any, options: any) => {
      alert('You cannot upload this file!\nPlease choose a picture with PNG or JPEG formats with size less than 5MB.');
    }

    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id']; // acquire userId from URL

      if (this.authService.loggedIn()) {
        // user is logged in
        this._user = this.authService.getUser(); // get logged in user

        if (this.userId) {
          // id included in the url
          this.userService.getUser(this.userId).subscribe((res) => {
            if (res['success']) this.user = res['user'] as User;
            else this.router.navigate(['/page-not-found']);

            // current user is the owner of the profile
            if (this.user._id == this._user._id) this.visitor = false
            // current user is not the owner of the profile
            else this.visitor = true;

            this.getUserCampaigns(this.user._id);
            this.getUserDonations(this.user._id);
            this.getUserDonationsSum(this.user._id);
            this.getUserReceivedDonations(this.user._id);
          })
        }
        else {
          // id not included in the url
          // not a visitor
          this.user = this._user;
          this.visitor = false; // is the owner

          this.getUserCampaigns(this.user._id);
          this.getUserDonations(this.user._id);
          this.getUserDonationsSum(this.user._id);
          this.getUserReceivedDonations(this.user._id);
          this.getUserReceivedDonationsNotWithdrawen(this.user._id);
        }
      }
      else {
        // user is anonymous
        this.visitor = true;

        if (this.userId) {
          // id should be included in the url
          this.userService.getUser(this.userId).subscribe((res) => {
            if (res['success']) this.user = res['user'] as User;
            else this.router.navigate(['/page-not-found']);

            this.getUserCampaigns(this.userId);
            this.getUserDonations(this.userId);
          })
        }
        else {
          // id is not included in the url
          this.router.navigate(['/page-not-found']);
        }
      }
    });

    this.updateForm = this.formBuilder.group({
      avatar: [],
      phone: [this._user.phone],
      email: [this._user.email, [
        Validators.required,
        Validators.email
      ]],
      password: [''],
      confirmPassword: [''],
      firstName: [this._user.firstName, [
        Validators.required
      ]],
      lastName: [this._user.lastName, [
        Validators.required
      ]],
      address: [this._user.address, [
        Validators.required
      ]],
      city: [this._user.city, [
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

  getUserCampaigns(id: string) {
    this.campaignService.getUserCampaigns(id).subscribe((res) => {
      this.campaigns = res['campaigns'] as Campaign[];
    });
  }

  getUserDonations(id: string) {
    this.donationService.getUserDonations(id).subscribe((res) => {
      this.donations = res['donations'] as Donation[];
    });
  }

  getUserDonationsSum(id: string) {
    this.donationService.getUserDonationsSum(id).subscribe((res) => {
      this.donationsSum = res['amount'] as number;
    });
  }

  getUserReceivedDonations(id: string) {
    this.donationService.getUserReceivedDonations(id).subscribe((res) => {
      this.receivedDonations = res['donations'] as Donation[];
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

      // if (this.notWithdrawenDonationsSum < AppConfig.MINIMUM_WITHDRAW) {
      //   this.withdrawForm.disable();
      //   this.withdrawAlert = {
      //     msg: "You can't withdraw because your remaining balance is less than minimum allowed amount.",
      //     type: 'danger'
      //   }
      // }

      console.log(this.donationIds.value);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onClose() {
    this.modalService.hide(1);
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
          msg: 'Your details has been updated successfully.'
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
      owner: this._user._id
    }

    this.donationService.withdraw(withdrawal).subscribe((res) => {
      if (res['success']) {
        console.log(res);
        this.getUserReceivedDonationsNotWithdrawen(this.user._id);

        // feedback
        this.withdrawAlert = {
          type: 'success',
          msg: 'Your request has been sent. Once it is verified funds will be transferred to your account.'
        }
      }
      else {
        this.withdrawAlert = {
          type: 'danger',
          msg: res['msg']
        }
      }
    })
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

}
