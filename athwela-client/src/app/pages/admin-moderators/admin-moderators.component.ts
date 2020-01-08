import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './../../components/register/validators/confirm-password.validator';
import { UsernameValidator } from './../../components/register/validators/username.validator';

@Component({
  selector: 'app-admin-moderators',
  templateUrl: './admin-moderators.component.html',
  styleUrls: ['./admin-moderators.component.scss'],
  providers: [UserService]
})
export class AdminModeratorsComponent implements OnInit {
  modalRef: BsModalRef;
  moderators: User[];
  registerForm: FormGroup;

  alert: any;

  getModerators() {
    this.userService.getModerators().subscribe((res) => {
      this.moderators = res['users'] as User[];
    });
  }

  onRegister() {
    this.userService.registerMod({
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      address: this.address.value,
      phone: this.phone.value,
      city: this.city.value
    }).subscribe((res) => {
      if (res['success']) {
        this.alert = {
          type: 'success',
          msg: 'Thank you for registering on Athwela. You may now sign in.'
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


  constructor(private modalService: BsModalService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getModerators();

    this.registerForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5)
      ],
        UsernameValidator.createValidator(this.authService)
      ],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]],
      confirmPassword: ['', [
        Validators.required
      ]],
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      city: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.required
      ]],
    },
      { validator: ConfirmPasswordValidator.matchPassword }
    );
  }

  openRegister(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get city() {
    return this.registerForm.get('city');
  }
}


