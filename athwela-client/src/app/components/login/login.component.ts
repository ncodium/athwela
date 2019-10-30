import { Component, OnInit, SecurityContext } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  usernameInvalid = false;
  passwordInvalid = false;
  alerts: any = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer,
    public bsModalRef: BsModalRef
  ) {
    this.alerts = this.alerts.map((alert: any) => ({
      type: alert.type,
      msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
  }

  ngOnInit() {
    this.alerts = [
      {
        type: 'info',
        msg: 'Please enter your username and password in their respective fields and click on <strong>Sign in</strong> to continue.'
      }
    ]
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    if (!this.username && !this.password) {
      this.alerts = [
        {
          type: 'warning',
          msg: `You haven't typed in your username and password. Please provide them to continute.`
        }
      ];

      this.usernameInvalid = this.passwordInvalid = true;
    }
    else if (!this.username) {
      this.alerts = [
        {
          type: 'warning',
          msg: `Please provide your username to continue.`
        }
      ];

      this.usernameInvalid = true;
      this.passwordInvalid = false;
    }
    else if (!this.password) {
      this.alerts = [
        {
          type: 'warning',
          msg: `Your password is missing.`
        }
      ];

      this.passwordInvalid = true;
      this.usernameInvalid = false;
    }
    else {
      this.usernameInvalid = this.passwordInvalid = false;

      this.authService.authenticateUser(user).subscribe(data => {
        if (data['success']) {
          this.authService.storeUserData(data['token'], data['user']);

          this.alerts = [
            {
              type: 'success',
              msg: `You are logged in!`
            }
          ];

          this.bsModalRef.hide();
          if (this.authService.isAdmin()) this.router.navigate(['/admin']);
          if (this.authService.isMod()) this.router.navigate(['/mod']);
          else this.router.navigate(['/profile']);

        } else {
          console.log(data);
          this.alerts = [
            {
              type: 'danger',
              msg: [data['msg']]
            }
          ];

          this.usernameInvalid = this.passwordInvalid = true;
        }
      });
    }
  }
}
