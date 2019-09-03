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
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

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
        // this.router.navigate(['']);
        
      } else {
        console.log(data);
        this.alerts = [
          {
            type: 'danger',
            msg: [data['msg']]
          }
        ];
      }
    });
  }
}
