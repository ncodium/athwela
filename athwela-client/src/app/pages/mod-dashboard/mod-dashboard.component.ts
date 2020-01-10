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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './../../components/register/validators/confirm-password.validator';
import { AppConfig } from 'src/app/config/app-config';

@Component({
  selector: 'app-mod-dashboard',
  templateUrl: './mod-dashboard.component.html',
  styleUrls: ['./mod-dashboard.component.scss'],
  providers: [CampaignService]
})
export class ModDashboardComponent implements OnInit {
  routeSub: Subscription;
  modalRef: BsModalRef;
  uploader: FileUploader;
  response: any;
  alert: any;

  updateForm: FormGroup;

  user: User;

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
      allowedMimeType: ['image/png', 'image/jpeg'] //will be loaded only PNG and JPG files
    });
  }

  ngOnInit() {
    this.user = this.authService.getUser(); // get logged in user

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.response = JSON.parse(response);
      alert('File uploaded successfully!');
      this.avatar.setValue(AppConfig.BASE_URL + this.response.path);
    };
    this.uploader.onWhenAddingFileFailed = (item: any, response: any, options: any) => {
      alert('You cannot upload this file!\nPlease choose a picture with PNG or JPEG formats with size less than 5MB.');
    }

    this.updateForm = this.formBuilder.group({
      avatar: [],
      email: [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      phone: [this.user.phone],
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
  }

  onClose() {
    this.modalService.hide(1);
  }

  openSettings(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
      phone: this.phone.value,
      city: this.city.value
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

  get avatar() {
    return this.updateForm.get('avatar');
  }

  get phone() {
    return this.updateForm.get('phone');
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
}
