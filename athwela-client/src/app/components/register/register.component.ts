import { Component, OnInit, SecurityContext } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  role: String;

  nameInvalid: boolean;
  emailInvalid: boolean;
  usernameInvalid: boolean;
  passwordInvalid: boolean;

  alerts: any = [];

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    public bsModalRef: BsModalRef
  ) { }

  highlightInvalidInputFields() {
    // reset
    this.nameInvalid = this.usernameInvalid = this.emailInvalid = this.passwordInvalid = false;
    // and validate
    if (!this.username) this.usernameInvalid = true;
    if (!this.password) this.passwordInvalid = true;
    if (!this.name) this.nameInvalid = true;
    if (!this.email) this.emailInvalid = true;
  }

  ngOnInit() {
    // initiation state
    this.nameInvalid = this.usernameInvalid = this.emailInvalid = this.passwordInvalid = false;
    this.alerts = [
      {
        type: 'info',
        msg: 'Please enter your details in their respective fields and click on <strong>Register</strong> to continue.'
      }
    ]
  }

  onRegisterSubmit() {
    // generate an object from the data provided in fields
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    }

    // required fields
    if (!this.username && !this.email && !this.password && !this.name) {
      this.highlightInvalidInputFields();
      this.alerts = [
        {
          type: 'warning',
          msg: `You have to complete the form correctly first before submitting it.`
        }
      ];
    }
    else if (!this.username) {
      this.highlightInvalidInputFields();
      this.alerts = [
        {
          type: 'warning',
          msg: `Please provide your username to continue.`
        }
      ];
    }
    else if (!this.password) {
      this.highlightInvalidInputFields();
      this.alerts = [
        {
          type: 'warning',
          msg: `Please provide a password for your account to continue.`
        }
      ];
    }
    else if (!this.name) {
      this.highlightInvalidInputFields();
      this.alerts = [
        {
          type: 'warning',
          msg: `Please type in your name to continue.`
        }
      ];
    }
    else if (!this.email) {
      this.highlightInvalidInputFields();
      this.alerts = [
        {
          type: 'warning',
          msg: `Please provide your email address to continue.`
        }
      ];
    }
    else if (!this.validateService.validateRegister(user)) {
      this.highlightInvalidInputFields();
      this.alerts = [
        {
          type: 'danger',
          msg: `You have to complete the form correctly first before submitting it.`
        }
      ];
    }
    // validate Email
    else if (!this.validateService.validateEmail(user.email)) {
      this.highlightInvalidInputFields();

      // additionally
      this.emailInvalid = true;

      this.alerts = [
        {
          type: 'danger',
          msg: `The e-mail address you have entered seems to be invalid. Please use a valid email to continue.`
        }
      ];
    }
    // register User
    else this.authService.registerUser(user).subscribe(data => {
      this.highlightInvalidInputFields();

      if (data['success']) {
        this.alerts = [
          {
            type: 'success',
            msg: `Thank you for registering on <strong>Athwela</strong>. You are now registered and can proceed to <strong>Sign in!</strong>`
          }
        ];
      }
      else if (data['username_exist']) {
        this.alerts = [
          {
            type: 'warning',
            msg: `You can't register because an account with the username <strong>` + this.username + `</strong> already exist. Please try another username!`
          }
        ];
      } else {
        this.alerts = [
          {
            type: 'danger',
            msg: `Something went wrong! Please try again later.`
          }
        ];
      }
    });

  }

}
