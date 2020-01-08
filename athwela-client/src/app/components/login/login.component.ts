import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public onClose: Subject<boolean>;
  loginForm: FormGroup;
  alert: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
    });

    this.onClose = new Subject();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  onLogin() {
    this.authService.authenticateUser({
      username: this.username.value,
      password: this.password.value
    }).subscribe((res) => {
      if (res['success']) {
        this.authService.storeUserData(res['token'], res['user']);
        this.onClose.next(true); // trigger refresh on navigation-component

        if (this.authService.isAdmin())
          this.router.navigate(['/admin']);
        else if (this.authService.isMod())
          this.router.navigate(['/mod']);
        else
          this.router.navigate(['/profile']);

        this.bsModalRef.hide();
      }
      else {
        this.alert = res['msg'];
        console.warn()
      }
    })
  }

}