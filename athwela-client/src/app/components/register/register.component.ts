import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { ConfirmPasswordValidator } from './validators/confirm-password.validator';
import { UsernameValidator } from './validators/username.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public onClose: Subject<boolean>;
  registerForm: FormGroup;
  alert: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
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

    this.onClose = new Subject();
  }

  onRegister() {
    this.authService.registerUser({
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
          msg: res['msg']
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
